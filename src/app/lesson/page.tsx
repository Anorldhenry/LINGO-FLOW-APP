'use client'

import { useState, useEffect, Suspense, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Heart, Volume2, Check, XCircle, Trophy, Loader2, WifiOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

import { LessonItem, LESSON_BANKS } from '@/lib/lesson-data'

const speakWord = (word: string, lang: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(word);
  if (lang === 'Arabic') utterance.lang = 'ar-SA';
  if (lang === 'Kiswahili') utterance.lang = 'sw-KE';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const ClickableText = ({ text, lang }: { text: string; lang: string }) => {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) => {
        if (!part.trim()) return <span key={i}>{part}</span>;
        return (
          <span 
            key={i} 
            onClick={(e) => {
              e.preventDefault();
              speakWord(part, lang);
            }}
            className="cursor-pointer hover:text-[#58CC02] hover:underline underline-offset-4 decoration-2 decoration-dashed transition-colors"
          >
            {part}
          </span>
        )
      })}
    </>
  )
}


function LessonContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // 1. URL Parameters
  const langKey = searchParams.get('lang') || 'Arabic'
  const moduleKey = searchParams.get('module')
  
  // 2. State Management
  const [activeLessonItems, setActiveLessonItems] = useState<LessonItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Feedback & Review States
  const [failedItems, setFailedItems] = useState<LessonItem[]>([])
  const [isReviewing, setIsReviewing] = useState(false)
  const [showReviewPrompt, setShowReviewPrompt] = useState(false)
  const [initialTotalCount, setInitialTotalCount] = useState(0)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  // 3. Initialization Logic
  useEffect(() => {
    const fetchLessons = async () => {
      setIsSaving(true) // Using as a general loading state for start
      
      let query = supabase
        .from('lessons')
        .select('*')
        .eq('lang', langKey)
      
      if (moduleKey) {
        // Map module key to module order or name
        const numMap: any = {
          'greetings': 1, 'time': 2, 'actions': 3,
          'questions': 4, 'conversations': 5, 'advanced': 6,
          'professional': 7, 'planning': 8, 'storytelling': 9,
          'logic': 10, 'logistics': 11, 'fluency': 12
        }
        const order = numMap[moduleKey]
        if (order) {
          query = query.eq('module_order', order)
        }
      }

      const { data, error } = await query.order('external_id', { ascending: true })

      let finalBank: LessonItem[] = []
      
      if (!error && data && data.length > 0) {
        finalBank = data.map(d => ({
          id: d.external_id,
          type: d.type as any,
          question: d.question,
          options: d.options as string[],
          answer: d.answer
        }))
      } else {
        // Fallback to static data
        const staticLessons = LESSON_BANKS[langKey] || []
        
        if (moduleKey) {
          const numMap: any = {
            'greetings': 1, 'time': 2, 'actions': 3,
            'questions': 4, 'conversations': 5, 'advanced': 6,
            'professional': 7, 'planning': 8, 'storytelling': 9,
            'logic': 10, 'logistics': 11, 'fluency': 12
          }
          const order = numMap[moduleKey]
          if (order) {
            const prefix = `${langKey.charAt(0).toLowerCase()}${order}-`
            const fallbacks = staticLessons.filter((l: LessonItem) => l.id.startsWith(prefix))
            finalBank = fallbacks
          } else {
            finalBank = staticLessons
          }
        } else {
          finalBank = staticLessons
        }
      }

      if (finalBank.length > 0) {
        setActiveLessonItems(finalBank)
        setInitialTotalCount(finalBank.length)
      } else {
        setActiveLessonItems([])
        setInitialTotalCount(0)
      }
      
      setIsSaving(false)
      setCurrentIndex(0)
      setSelectedOption(null)
      setFeedback(null)
      setIsFinished(false)
      setFailedItems([])
      setIsReviewing(false)
      setShowReviewPrompt(false)
      setMistakesCount(0)
    }

    fetchLessons()
  }, [langKey, moduleKey, supabase])

  // 4. Persistence / Resume Logic
  useEffect(() => {
    const loadProgress = async () => {
      const isResume = searchParams.get('resume') === 'true'
      if (!isResume || activeLessonItems.length === 0) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase.from('profiles').select('last_lesson_index').eq('id', user.id).single()
      if (profile && profile.last_lesson_index > 0 && profile.last_lesson_index < activeLessonItems.length) {
        setCurrentIndex(profile.last_lesson_index)
      }
    }
    loadProgress()
  }, [searchParams, supabase, activeLessonItems.length])

  // 5. Derived State
  const currentItem = activeLessonItems[currentIndex]

  // Shuffle logic
  const shuffleArray = useCallback((array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  useEffect(() => {
    if (currentItem?.options) {
      setShuffledOptions(shuffleArray(currentItem.options))
    }
  }, [currentIndex, currentItem, shuffleArray])

  // 6. Action Handlers
  const playSound = (type: 'correct' | 'wrong' | 'click' | 'finish') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      } else if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
      } else if (type === 'finish') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      }

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.error("Unbreakable Sound Error:", e);
    }
  };

  const handleCheck = () => {
    if (feedback) {
      handleNext()
      return
    }

    let representsCorrect = false
    if (currentItem.type === 'mcq' || currentItem.type === 'listening') {
      representsCorrect = selectedOption === currentItem.answer
    } else if (currentItem.type === 'translation') {
      representsCorrect = textInput.trim().toLowerCase() === currentItem.answer.toLowerCase()
    }

    if (representsCorrect) {
      setFeedback('correct')
      playSound('correct')
    } else {
      setFeedback('incorrect')
      playSound('wrong')
      // Record mistake - always add to failedItems for redoing later
      if (!failedItems.find(f => f.id === currentItem.id)) {
        setFailedItems(prev => [...prev, currentItem])
        setMistakesCount(prev => prev + 1)
      }
    }
  }

  const handleNext = async () => {
    setFeedback(null)
    setSelectedOption(null)
    setTextInput('')

    if (currentIndex + 1 >= activeLessonItems.length) {
      // Round end: check if we have any mistakes to redo
      if (failedItems.length > 0) {
        setShowReviewPrompt(true)
      } else {
        await finishLesson()
      }
    } else {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      saveProgress(nextIdx)
    }
  }

  const saveProgress = async (newIndex: number) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({
      last_lesson_lang: langKey,
      last_lesson_module: moduleKey,
      last_lesson_index: newIndex
    }).eq('id', user.id)
  }

  const finishLesson = async () => {
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Fetch fresh profile data to avoid stale state issues
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('xp, completed_modules')
          .eq('id', user.id)
          .single()

        if (fetchError) throw fetchError

        const currentCompleted = profile?.completed_modules || []
        const updatedCompleted = moduleKey && !currentCompleted.includes(moduleKey) 
          ? [...currentCompleted, moduleKey] 
          : currentCompleted

        const { error: updateError } = await supabase.from('profiles').update({
          last_lesson_lang: null,
          last_lesson_module: null,
          last_lesson_index: 0,
          xp: (profile?.xp || 0) + 10,
          completed_modules: updatedCompleted
        }).eq('id', user.id)

        if (updateError) throw updateError
        
        console.log('Progress saved successfully:', updatedCompleted)
      }
    } catch (error) {
      console.error('Failed to save lesson progress:', error)
      alert('Note: We had trouble saving your progress to the cloud. Please check your connection.')
    } finally {
      setIsSaving(false)
      setIsFinished(true)
      playSound('finish')
    }
  }

  const startReview = () => {
    // RECURSIVE MASTERY: Promote mistakes to active items
    setActiveLessonItems([...failedItems])
    setFailedItems([])
    setIsReviewing(true)
    setCurrentIndex(0)
    setShowReviewPrompt(false)
    playSound('click')
    saveProgress(0)
  }

  const playAudio = () => {
    if (currentItem?.answer) {
      speakWord(currentItem.answer, langKey);
    }
  }

  const nextModule = {
    'greetings': 'time', 'time': 'actions', 'actions': 'questions',
    'questions': 'conversations', 'conversations': 'advanced'
  }[moduleKey || ''] || null

  const level2Modules = ['professional', 'planning', 'storytelling', 'logic', 'logistics', 'fluency'];
  if (!isOnline && moduleKey && level2Modules.includes(moduleKey)) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <WifiOff className="w-16 h-16 text-[#FF4B4B] mb-4" />
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Connection Required</h1>
        <p className="text-lg font-bold text-muted mb-8 max-w-md">Level 2 Mastery lessons require an active internet connection to access advanced conversational grading.</p>
        <button onClick={() => router.push('/dashboard')} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] text-white hover:bg-[#46A302] px-12 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all">
          Back to Dashboard
        </button>
      </div>
    )
  }

  // UI Rendering follows...
  if (!currentItem && !isFinished && !showReviewPrompt) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Coming Soon!</h1>
        <p className="text-lg font-bold text-bold mb-8">This unit is currently under construction for {langKey}.</p>
        <button onClick={() => router.push('/dashboard')} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] text-white hover:bg-[#46A302] px-12 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const progressPercent = initialTotalCount > 0 ? (isReviewing ? 100 : (currentIndex / initialTotalCount) * 100) : 0
  const displayPercentage = Math.round(progressPercent)

  if (showReviewPrompt) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-float">
          <img src="/assets/mascot_think.png" alt="Review Mascot" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-6">Let's review!</h1>
        <p className="text-2xl font-bold text-bold mb-12">You missed {failedItems.length} exercise{failedItems.length > 1 ? 's' : ''}. Let's practice them to finish.</p>
        <button onClick={startReview} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-12 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all">
          Start Review
        </button>
      </div>
    )
  }

  if (isFinished) {
    const accuracy = initialTotalCount > 0 ? Math.max(0, Math.round(((initialTotalCount - mistakesCount) / initialTotalCount) * 100)) : 100
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-float">
          <img src="/assets/mascot_celebrate.png" alt="Success Mascot" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-hover rounded-xl text-sm font-black text-bold tracking-widest uppercase mb-4 shadow-sm border-2 border-border-color">
          {langKey} • {moduleKey || 'General'} Module
        </div>
        <h1 className="text-4xl font-extrabold text-[#FFC800] mb-8 text-center px-4">
          {langKey === 'Arabic' ? 'Mabrouk! (Congratulations!)' : 
           langKey === 'German' ? 'Glückwunsch! (Congratulations!)' :
           langKey === 'French' ? 'Félicitations! (Congratulations!)' :
           'Lesson Complete!'}
        </h1>
        <div className="flex gap-4 mb-10 w-full max-w-sm mx-auto">
           <div className="flex-1 bg-surface border-2 border-border-color border-b-4 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="text-[#FFC800] font-black text-xs uppercase tracking-widest mb-1">Total XP</div>
              <div className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                 <Trophy className="h-5 w-5 text-[#FFC800] fill-current" /> +10
              </div>
           </div>
           <div className="flex-1 bg-surface border-2 border-border-color border-b-4 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="text-[#58CC02] font-black text-xs uppercase tracking-widest mb-1">Accuracy</div>
              <div className="text-2xl font-extrabold text-foreground">{accuracy}%</div>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {nextModule && (
            <button onClick={() => router.push(`/lesson?lang=${langKey}&module=${nextModule}`)} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-12 py-4 rounded-2xl border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all">
              Continue to {nextModule.charAt(0).toUpperCase() + nextModule.slice(1)}
            </button>
          )}
          <button onClick={() => router.push('/dashboard')} className="uppercase tracking-widest text-sm font-bold bg-surface text-bold hover:bg-surface-hover px-12 py-4 rounded-2xl border-2 border-border-color border-b-4 active:border-b-0 active:translate-y-1 transition-all">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col animate-in fade-in duration-500">
      <div className="px-4 py-4 max-w-4xl mx-auto w-full flex items-center gap-3">
        <button onClick={() => router.push('/dashboard')} className="text-bold hover:text-foreground transition-colors">
           <X className="h-6 w-6" />
        </button>
        <button 
          onClick={() => { console.log("Manual Sound Test Initiated"); playSound('click'); }}
          className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-surface-hover text-bold border-2 border-border-color rounded-lg hover:bg-surface hover:text-[#58CC02] transition-all"
        >
          🔊 Test Speakers
        </button>
        <div className="flex-1 bg-border-color h-4 rounded-full overflow-hidden relative">
          <div className="bg-[#58CC02] h-full transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="flex items-center gap-1 text-[#FF4B4B] font-bold">
          <Heart className="h-6 w-6 fill-current" /> 5
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-center px-4 pb-24 relative">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 relative">
            <img 
              src={feedback === 'correct' ? '/assets/mascot_celebrate.png' : feedback === 'incorrect' ? '/assets/mascot_think.png' : '/assets/mascot_idle.png'} 
              className={`w-full h-auto object-contain transition-all duration-300 ${feedback === 'correct' ? 'animate-celebrate' : feedback === 'incorrect' ? 'animate-thinking' : 'animate-float'}`}
              alt="Mascot"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-foreground mb-4 leading-tight">
              <ClickableText text={currentItem?.question || ''} lang={langKey} />
            </h2>
          </div>
        </div>

        {currentItem?.type === 'listening' && (
          <div className="mb-6 flex justify-center">
            <button onClick={playAudio} className="h-20 w-20 bg-[#58CC02] rounded-2xl border-b-[6px] border-[#357B00] flex items-center justify-center hover:bg-[#46A302] active:border-b-0 active:translate-y-1.5 transition-all">
               <Volume2 className="h-10 w-10 text-white" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shuffledOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                if (!feedback) {
                  playSound('click')
                  setSelectedOption(opt)
                }
              }}
              className={`p-3 rounded-xl border-2 text-left font-bold text-base md:text-lg transition-all ${selectedOption === opt ? 'border-[#58CC02] bg-info-bg border-b-[4px] text-[#58CC02]' : feedback ? 'border-border-color opacity-50 text-foreground' : 'border-border-color border-b-[4px] hover:bg-surface-hover text-foreground active:border-b-2 active:translate-y-1'}`}
            >
              <ClickableText text={opt} lang={langKey} />
            </button>
          ))}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 border-t-2 z-50 transition-colors duration-300 ${feedback === 'correct' ? 'bg-success-bg border-success-bg' : feedback === 'incorrect' ? 'bg-error-bg border-error-bg' : 'bg-surface border-border-color'}`}>
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl md:text-2xl font-extrabold">
            {feedback === 'correct' && <><div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center"><Check className="h-6 w-6 text-[#58CC02]" /></div><span className="text-[#58CC02]">Awesome!</span></>}
            {feedback === 'incorrect' && <><div className="h-10 w-10 md:h-12 md:w-12 bg-surface rounded-full flex items-center justify-center"><XCircle className="h-5 w-5 md:h-6 md:w-6 text-[#EA2B2B]" /></div><div className="text-[#EA2B2B]"><div className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mb-1">Correct Answer:</div><div className="text-base md:text-lg">{currentItem?.answer}</div></div></>}
          </div>
          <button onClick={handleCheck} disabled={!feedback && !selectedOption} className={`uppercase tracking-widest text-xs md:text-sm font-bold px-8 py-3 md:px-10 md:py-4 rounded-xl transition-all ${feedback === 'correct' ? 'bg-[#58CC02] text-white border-b-4 border-[#46A302]' : feedback === 'incorrect' ? 'bg-[#EA2B2B] text-white border-b-4 border-[#CC2020]' : !selectedOption ? 'bg-border-color text-bold' : 'bg-[#58CC02] text-white border-b-4 border-[#46A302]'}`}>
            {feedback ? 'Continue' : 'Check'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#58CC02]"/></div>}>
      <LessonContent />
    </Suspense>
  )
}
