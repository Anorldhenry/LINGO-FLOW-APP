'use client'

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-[#FF4B4B] text-white px-4 py-1.5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest animate-in slide-in-from-top duration-300">
      <WifiOff className="h-3 w-3" />
      You are currently offline. Some features may be limited.
    </div>
  );
}
