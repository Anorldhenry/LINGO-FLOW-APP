import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { LESSON_BANKS } from '@/lib/lesson-data'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: "application/json",
  }
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { message, lang } = await req.json()
    
    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 })

    // 0. SUBSCRIPTION & PROGRESS CHECK
    let completedModules = []
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_expiry, completed_modules')
        .eq('id', user.id)
        .single()
      
      const isSubscribed = profile && profile.subscription_tier && profile.subscription_tier !== 'free'
      if (!isSubscribed) {
        return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
      }
      completedModules = profile.completed_modules || []
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        response: "Oops! I'm missing my AI brain (API Key). Please add GEMINI_API_KEY to your environment variables to start chatting!", 
        tip: "Developer Tip: Add your Gemini API key to .env.local to fix this."
      })
    }

    // 1. FETCH CONTEXT (Previous conversation history)
    let historyContext = ""
    if (user) {
      const { data: pastMessages } = await supabase
        .from('tutor_messages')
        .select('role, content')
        .eq('user_id', user.id)
        .eq('lang', lang)
        .order('created_at', { ascending: false })
        .limit(6)

      if (pastMessages && pastMessages.length > 0) {
        historyContext = pastMessages.reverse().map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')
      }
    }

    // 2. CONSTRUCT SYSTEM PROMPT
    const exercisesForLang = LESSON_BANKS[lang] || [];
    const exerciseContext = JSON.stringify(exercisesForLang);

    const systemPrompt = `
      You are "Coach Lingo", a friendly and encouraging language tutor for Lingo Flow.
      The user is currently learning ${lang}.
      
      SYSTEM KNOWLEDGE (LANGUAGE EXERCISES):
      Here are the language exercises available in the system for ${lang}. 
      Use these to guide the user, verify vocabulary, and correct mistakes:
      ${exerciseContext}

      USER PROGRESS:
      The user has already completed the following modules: ${completedModules.join(', ') || 'None yet'}.
      Use this to:
      - Praise the user for their recent completions if appropriate.
      - Challenge them with concepts from modules they haven't finished yet.
      - Refine your feedback based on what they should already know.

      YOUR GOALS:
      - Reply naturally to the user's message.
      - If the user asks general questions or questions about vocabulary, answer according to the SYSTEM KNOWLEDGE above.
      - If the user uses ${lang}, correct any grammar mistakes gently using the SYSTEM KNOWLEDGE.
      - If they use English, encourage them by teaching a few related words in ${lang} from the SYSTEM KNOWLEDGE.
      - Keep responses supportive, bite-sized, and fun.
      - Use emojis occasionally.
      
      IMPORTANT: You MUST respond in JSON format with exactly two fields:
      {
        "response": "Your main response text here",
        "tip": "A short, helpful language learning tip related to what you've discussed or what they should learn next based on their progress"
      }
      
      PREVIOUS CONVERSATION CONTEXT:
      ${historyContext || "This is the start of a new conversation."}
    `

    // 3. GENERATE AI RESPONSE
    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}`)
    const responseText = result.response.text()
    
    let parsedResponse = { response: "", tip: "" }
    try {
      parsedResponse = JSON.parse(responseText)
    } catch (e) {
      // Fallback if AI output is malformed
      parsedResponse = { 
        response: responseText, 
        tip: `Keep practicing your ${lang}!` 
      }
    }

    const aiResponse = parsedResponse.response
    const tip = parsedResponse.tip

    // 4. PERSISTENCE (Save the interaction)
    if (user) {
      const { error } = await supabase.from('tutor_messages').insert([
        { user_id: user.id, lang: lang, role: 'user', content: message },
        { user_id: user.id, lang: lang, role: 'assistant', content: aiResponse, tip: tip }
      ])
      if (error) console.error('Tutor DB Log Error:', error)
    }

    return NextResponse.json({ response: aiResponse, tip: tip })

  } catch (error) {
    console.error('Tutor AI Error:', error)
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 })
  }
}
