import React, { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  style,
}) => {
  const [isProduction, setIsProduction] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);
  const isPushedRef = useRef(false);
  const isNumericSlot = slotId && /^\d+$/.test(slotId);

  // ১. ডোমেন ভেরিফিকেশন
  useEffect(() => {
    const isProd =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'nazmulcodes.org' ||
        window.location.hostname === 'www.nazmulcodes.org');

    setIsProduction(isProd);
  }, []);

  // ২. শুধুমাত্র <ins> ট্যাগ DOM-এ মাউন্ট হওয়ার পর push({}) কল
  useEffect(() => {
    if (!isProduction || isPushedRef.current) return;

    // DOM পেইন্ট শেষ হওয়া পর্যন্ত একটি মাইক্রোটাস্ক অপেক্ষা
    const timeoutId = setTimeout(() => {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
        
        // নিশ্চিত হওয়া হচ্ছে যে insRef ব্রাউজারে বর্তমান এবং আগে প্রসেস হয়নি
        if (
          adsbygoogle &&
          insRef.current &&
          !insRef.current.getAttribute('data-adsbygoogle-status')
        ) {
          adsbygoogle.push({});
          isPushedRef.current = true;
        }
      } catch {
        // Safe ignore
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [isProduction]);

  // প্রোডাকশন না হলে DOM খালি থাকবে
  if (!isProduction) {
    return null;
  }

  return (
    <aside
      className={`ad-slot-container ${className}`}
      style={{
        width: '100%',
        margin: '1.5rem 0',
        overflow: 'hidden',
        ...style,
      }}
      aria-label="Advertisement"
      suppressHydrationWarning
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-client="ca-pub-3337739847756959"
        {...(isNumericSlot ? { 'data-ad-slot': slotId } : {})}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        suppressHydrationWarning
      />
    </aside>
  );
};