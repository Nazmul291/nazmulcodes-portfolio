import React, { useEffect, useState } from 'react';

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
  const isNumericSlot = slotId && /^\d+$/.test(slotId);

  useEffect(() => {
    const isProd =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'nazmulcodes.org' ||
        window.location.hostname === 'www.nazmulcodes.org');
    
    setIsProduction(isProd);

    if (isProd) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      } catch {
        // Ignore push errors
      }
    }
  }, []);

  // ডেভেলপমেন্ট এনভায়রনমেন্টে পুরোপুরি হাইড থাকবে (অথবা এম্পটি ডিভ রিটার্ন করবে)
  if (!isProduction) {
    return <div className="ad-slot-dev-placeholder" style={{ display: 'none' }} aria-hidden="true" />;
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