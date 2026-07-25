import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.15;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.15;
      trail.style.left = `${trailPos.current.x}px`;
      trail.style.top = `${trailPos.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="pointer"]');
        
      if (isPointer) {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        trail.style.width = '60px';
        trail.style.height = '60px';
        trail.style.borderColor = 'rgba(255,0,170,0.8)';
        trail.style.background = 'rgba(255,0,170,0.15)';
      } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        trail.style.width = '36px';
        trail.style.height = '36px';
        trail.style.borderColor = 'rgba(255,0,170,0.4)';
        trail.style.background = 'transparent';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 999999, transition: 'transform 0.15s ease' }}
      />
      <div
        id="cursor-trail"
        ref={trailRef}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 999998 }}
        className="animate-pulse-slow"
      />
    </>
  );
}
