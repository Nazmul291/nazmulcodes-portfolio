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

  return (
    <aside
      className={`ad-slot-container ${className}`}
      style={{ minHeight: '120px', width: '100%', ...style }}
      aria-label="Advertisement"
      suppressHydrationWarning
    >
      <span className="ad-slot-label">Advertisement</span>
      {isProduction ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-3337739847756959"
          {...(isNumericSlot ? { 'data-ad-slot': slotId } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          suppressHydrationWarning
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}
          suppressHydrationWarning
        >
          Google AdSense Placement Area (Active on production domain)
        </div>
      )}
    </aside>
  );
};
