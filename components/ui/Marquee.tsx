'use client';

type Props = {
  items: React.ReactNode[];
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  separator?: React.ReactNode;
};

export function Marquee({ items, speed = 'normal', className = '', separator }: Props) {
  const sep = separator ?? <span className="mx-6 inline-block w-1 h-1 rounded-full bg-current opacity-50" />;
  const speedCls = speed === 'fast' ? 'fast' : speed === 'slow' ? 'slow' : '';
  const row = (
    <div className="flex items-center whitespace-nowrap shrink-0">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          {it}
          {sep}
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className={`marquee-track ${speedCls}`}>
        {row}
        {row}
      </div>
    </div>
  );
}
