import { NextRequest, NextResponse } from 'next/server'

// PROCEDURAL ENGINE - No Subscription Required
// This engine uses randomized templates and logic to feel dynamic.
export async function POST(req: NextRequest) {
  try {
    const { message, lang } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 })

    const lowerMsg = message.toLowerCase()
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 1. HELPERS & POOLS
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

    const PERSO_REACTORS = [
      "Oh, interesting!", "Aha! I see.", "Wait, that's a great question!", "I love discussing that!",
      "Hmm, let me think...", "Good one!", "You're getting better at this daily!"
    ]

    const FOLLOW_UPS = [
      "By the way, what made you start learning {lang}?", 
      "Do you practice often? I'm here 24/7!", 
      "Tell me a bit about your favorite hobby, in {lang} if you can!",
      "What are you planning to do for the rest of your day?",
      "Have you visited any countries where they speak {lang}?"
    ]

    const LANG_DATA: Record<string, any> = {
      Arabic: {
        greetings: ["Marhaba!", "Ahlan!", "As-salamu alaykum!", "Sabah al-khayr!"],
        topics: {
          food: "Arabic food is delicious! (Al-ta'am al-'Arabi ladhidh!)",
          travel: "The Middle East has so much history to explore. (Ash-sharq al-awsat laho tarikh tawil.)",
          grammar: "Arabic reads from right to left, and has unique root systems!"
        },
        dictionary: { 'hello': 'marhaba', 'coffee': 'qahwa', 'friend': 'sadiq', 'love': 'hubb', 'good': 'jayyid' }
      },
      Runyankore: {
        greetings: ["Agandi!", "Oraire ota!", "Osiibire ota!", "Mwebare!"],
        topics: {
          food: "Traditional Runyankore food like matooke is great! (Ebyokurya by'ekinyankore nk'amatooke nibirungi!)",
          travel: "Western Uganda is beautifully green! (Burengerazuba bwa Uganda n'oburungi!)",
          grammar: "Runyankore is a Bantu language with rich noun classes!"
        },
        dictionary: { 'hello': 'agandi', 'coffee': 'eikawa', 'friend': 'omunywani', 'love': 'okukunda', 'good': 'kirungi' }
      },
      Kiswahili: {
        greetings: ["Jambo!", "Habari ya asubuhi!", "Mambo vipi!", "Hujambo!", "Habari!"],
        topics: {
          food: "Chakula cha Afrika Mashariki ni kizuri sana! (East African food is very good!)",
          travel: "Kenya na Tanzania ni maeneo mazuri kwa utalii. (Kenya and Tanzania are great for tourism.)",
          grammar: "Kiswahili kina ngeli (noun classes), lakini tutazielewa!"
        },
        dictionary: { 'hello': 'jambo', 'coffee': 'kahawa', 'friend': 'rafiki', 'love': 'upendo', 'good': 'nzuri' }
      },
      Luganda: {
        greetings: ["Ki kati!", "Osiibye otyanno!", "Wasuze otyanno!", "Kulika!"],
        topics: {
          food: "Luwombo is a delicious traditional Luganda dish! (Luwombo kya mmere kirungi nnyo!)",
          travel: "Uganda is the Pearl of Africa, and Buganda is its heart! (Uganda ye pami y'Afirika!)",
          grammar: "Luganda uses prefixes to change the meaning of words!"
        },
        dictionary: { 'hello': 'ki kati', 'coffee': 'emmwanyi', 'friend': 'mukwano', 'love': 'okwagala', 'good': 'kirungi' }
      }
    }

    const currentLang = LANG_DATA[lang as string] || LANG_DATA['Arabic']
    let aiResponse = ""
    let tip = "TIP: Learning a language is like building a house. One brick at a time!"

    // 2. PROCEDURAL ASSEMBLER
    const reactor = getRandom(PERSO_REACTORS)
    const followUp = getRandom(FOLLOW_UPS).replace(/{lang}/g, lang)

    // Match logic
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
       aiResponse = `${getRandom(currentLang.greetings)} ${reactor} What's on your mind today?`
       tip = `TIP: Try asking 'How are you?' in ${lang}.`
    } 
    else if (lowerMsg.includes('translate') || lowerMsg.includes('how do you say')) {
      const word = lowerMsg.split(' ').pop()?.replace(/[?!.]/g, '') || 'that'
      const translated = currentLang.dictionary[word] || "[AI-Simulation-Mode]"
      aiResponse = `${reactor} To say "${word}" in ${lang}, we usually say "${translated}". Does that make sense?`
      tip = "TIP: Some words have different meanings depending on the context!"
    }
    else if (lowerMsg.includes('food') || lowerMsg.includes('eat') || lowerMsg.includes('hungry')) {
      aiResponse = `${reactor} ${currentLang.topics.food} ${followUp}`
    }
    else if (lowerMsg.includes('travel') || lowerMsg.includes('trip') || lowerMsg.includes('visit')) {
      aiResponse = `${reactor} ${currentLang.topics.travel} ${followUp}`
    }
    else if (lowerMsg.includes('grammar') || lowerMsg.includes('rule')) {
      aiResponse = `${reactor} ${currentLang.topics.grammar} Just stay consistent!`
      tip = "TIP: Don't let the grammar get you down, communication is more important at the start!"
    }
    else {
      // General Versatile Fallback
      const genericLines = [
        `That's a very specific point about ${lang}! I'm glad you brought it up.`,
        `I love exploring these kinds of topics in ${lang}.`,
        `You're asking exactly the right questions for someone in your level!`
      ]
      aiResponse = `${reactor} ${getRandom(genericLines)} ${followUp}`
    }

    return NextResponse.json({ response: aiResponse, tip: tip })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
