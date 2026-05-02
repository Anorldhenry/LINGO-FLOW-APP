'use client'

import React, { useState } from 'react'
import { X, Check, CreditCard, Smartphone, Loader2, Sparkles, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  userId: string
}

export function PaymentModal({ isOpen, onClose, onSuccess, userId }: PaymentModalProps) {
  const [step, setStep] = useState<'plan' | 'payment' | 'processing'>('plan')
  const [billing, setBilling] = useState<'weekly' | 'monthly' | 'yearly' | 'family'>('monthly')
  const [method, setMethod] = useState<'card' | 'mobile'>('card')
  const [isPaid, setIsPaid] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!isOpen) return null

  const handleSimulatePayment = async () => {
    setStep('processing')
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsPaid(true)
  }

  const handleCompleteUpgrade = async () => {
    setIsUpdating(true)
    const supabase = createClient()
    
    // Update the subscription tier in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_tier: 'pro' })
      .eq('id', userId)

    if (!error) {
      onSuccess()
      onClose()
    } else {
      alert("System Error: Failed to activate Pro account.")
    }
    setIsUpdating(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      <div className="bg-surface w-full max-w-lg rounded-[48px] border-2 border-border-color shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-[#58CC02] p-2 rounded-xl">
                <Sparkles className="h-5 w-5 text-white" />
             </div>
             <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Upgrade to Pro</h2>
          </div>
          {!isUpdating && (
            <button onClick={onClose} className="p-2 hover:bg-surface-hover rounded-full transition-colors">
              <X className="h-6 w-6 text-bold" />
            </button>
          )}
        </div>

        <div className="p-8 pt-6 space-y-6">
          
          {step === 'plan' && (
            <div className="space-y-6">
              <div className="text-center">
                 <p className="text-bold font-bold text-sm italic">Master languages faster with Coach Lingo Pro</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                 <button 
                   onClick={() => setBilling('weekly')}
                   className={`p-4 rounded-[24px] border-2 text-left transition-all grayscale opacity-70 hover:grayscale-0 hover:opacity-100 ${billing === 'weekly' ? 'border-border-color bg-surface grayscale-0 opacity-100' : 'border-border-color bg-surface'}`}
                 >
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-black text-bold text-xs uppercase">Weekly</span>
                       {billing === 'weekly' && <Check className="h-4 w-4 text-[#58CC02]" />}
                    </div>
                    <div className="text-lg font-black text-foreground">$2.99 <span className="text-[10px] opacity-60">/ week</span></div>
                 </button>

                 <button 
                   onClick={() => setBilling('monthly')}
                   className={`p-4 rounded-[24px] border-2 text-left transition-all ${billing === 'monthly' ? 'border-[#58CC02] bg-success-bg ring-4 ring-[#58CC02]/10' : 'border-border-color bg-surface hover:bg-surface-hover'}`}
                 >
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-black text-foreground text-sm flex items-center gap-2">Individual Monthly <span className="text-[10px] bg-[#58CC02] text-white px-2 py-0.5 rounded-full">POPULAR</span></span>
                       {billing === 'monthly' && <Check className="h-4 w-4 text-[#58CC02]" />}
                    </div>
                    <div className="text-xl font-black text-[#58CC02]">$9.99 <span className="text-[10px] text-bold uppercase">/ month</span></div>
                 </button>

                 <button 
                   onClick={() => setBilling('family')}
                   className={`p-4 rounded-[24px] border-2 text-left transition-all relative overflow-hidden ${billing === 'family' ? 'border-[#58CC02] bg-success-bg ring-4 ring-[#58CC02]/10' : 'border-border-color bg-surface hover:bg-surface-hover'}`}
                 >
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-black text-foreground text-sm flex items-center gap-2">Family Monthly <span className="text-[10px] bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-black">SAVER</span></span>
                       {billing === 'family' && <Check className="h-4 w-4 text-[#58CC02]" />}
                    </div>
                    <div className="text-xl font-black text-[#58CC02]">$14.99 <span className="text-[10px] text-bold uppercase">/ month</span></div>
                    <p className="text-[10px] text-[#46A302] font-extrabold">Up to 5 people ($2.99/person)</p>
                 </button>

                 <button 
                   onClick={() => setBilling('yearly')}
                   className={`p-4 rounded-[24px] border-2 text-left transition-all relative overflow-hidden ${billing === 'yearly' ? 'border-[#58CC02] bg-success-bg ring-4 ring-[#58CC02]/10' : 'border-border-color bg-surface hover:bg-surface-hover'}`}
                 >
                    <div className="absolute top-0 right-0 bg-zinc-900 text-[9px] font-black text-white px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                       UNBEATABLE
                    </div>
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-black text-foreground text-sm flex items-center gap-2">Yearly Pro <span className="text-[10px] bg-white text-[#58CC02] border border-[#58CC02] px-2 py-0.5 rounded-full">BEST DEAL</span></span>
                       {billing === 'yearly' && <Check className="h-4 w-4 text-[#58CC02]" />}
                    </div>
                    <div className="text-xl font-black text-[#58CC02]">$59.99 <span className="text-[10px] text-bold uppercase">/ year</span></div>
                    <p className="text-[10px] text-[#46A302] font-extrabold">Save 50% vs Monthly Pro</p>
                 </button>
              </div>
              <button 
                onClick={() => setStep('payment')}
                className="w-full py-4 bg-[#58CC02] text-white rounded-2xl font-black uppercase tracking-widest border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                 <p className="text-bold font-bold text-sm">How would you like to pay?</p>
              </div>
              <div className="flex gap-4">
                 <button 
                   onClick={() => setMethod('card')}
                   className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'border-[#58CC02] bg-success-bg' : 'border-border-color bg-surface hover:bg-surface-hover'}`}
                 >
                    <CreditCard className={`h-6 w-6 ${method === 'card' ? 'text-[#58CC02]' : 'text-bold'}`} />
                    <span className="text-xs font-black uppercase tracking-widest">Card</span>
                 </button>
                 <button 
                   onClick={() => setMethod('mobile')}
                   className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'mobile' ? 'border-[#58CC02] bg-success-bg' : 'border-border-color bg-surface hover:bg-surface-hover'}`}
                 >
                    <Smartphone className={`h-6 w-6 ${method === 'mobile' ? 'text-[#58CC02]' : 'text-bold'}`} />
                    <span className="text-xs font-black uppercase tracking-widest">Mobile</span>
                 </button>
              </div>

              <div className="bg-surface-hover p-6 rounded-3xl border-2 border-border-color space-y-4">
                 {method === 'card' ? (
                   <div className="space-y-3">
                      <div className="h-10 bg-border-color/30 rounded-xl" />
                      <div className="flex gap-3">
                         <div className="h-10 flex-1 bg-border-color/30 rounded-xl" />
                         <div className="h-10 w-24 bg-border-color/30 rounded-xl" />
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-3 text-center">
                      <p className="text-xs font-bold text-muted italic">M-PESA / MTN / Airtel Money</p>
                      <div className="h-12 bg-border-color/30 rounded-xl flex items-center justify-center font-bold text-bold">
                         +256 XXX XXX XXX
                      </div>
                   </div>
                 )}
              </div>

              <div className="flex items-center gap-2 text-xs text-bold font-bold justify-center">
                 <ShieldCheck className="h-4 w-4 text-[#58CC02]" /> Secure 256-bit SSL encrypted payment
              </div>

              <button 
                onClick={handleSimulatePayment}
                className="w-full py-4 bg-[#58CC02] text-white rounded-2xl font-black uppercase tracking-widest border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all"
              >
                Pay Now
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              {!isPaid ? (
                <>
                  <div className="relative">
                     <div className="h-20 w-20 border-8 border-border-color border-t-[#58CC02] rounded-full animate-spin" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <CreditCard className="h-8 w-8 text-[#58CC02]" />
                     </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">Processing Payment...</h3>
                    <p className="text-bold font-bold mt-2">Please do not close this window</p>
                  </div>
                </>
              ) : (
                <div className="animate-in zoom-in duration-500">
                  <div className="h-24 w-24 bg-[#58CC02] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#58CC02]/20">
                     <Check className="h-12 w-12 text-white stroke-[4px]" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">Payment Successful!</h3>
                  <p className="text-bold font-bold mt-2 mb-8 px-8">Your account is now being upgraded to Lingo Flow Pro. Welcome to the elite league!</p>
                  
                  <button 
                    onClick={handleCompleteUpgrade}
                    disabled={isUpdating}
                    className="w-full py-4 bg-[#58CC02] text-white rounded-2xl font-black uppercase tracking-widest border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                    {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue to Pro'}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
