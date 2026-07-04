import { useCallback, useEffect, useRef, useState } from 'react';

import type { CarouselTheme, SlideData } from '@/schemas/carousel';

const THEMES: Record<CarouselTheme, { gradient: string; text: string; accent: string }> = {
  ocean: {
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.15)',
  },
  lavender: {
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.15)',
  },
  sunset: {
    gradient: 'linear-gradient(135deg, #ea580c 0%, #e11d48 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.15)',
  },
  forest: {
    gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.15)',
  },
  midnight: {
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.08)',
  },
  sunrise: {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)',
    text: '#1e293b',
    accent: 'rgba(0,0,0,0.08)',
  },
  cherry: {
    gradient: 'linear-gradient(135deg, #e11d48 0%, #db2777 100%)',
    text: '#ffffff',
    accent: 'rgba(255,255,255,0.15)',
  },
};

// Inline markup parser for slide text fields.
// **word**  → bold + ~10% bigger (most important claim)
// ==word==  → stabilo-style highlight background (hook/surprise phrase)
// __word__  → accent colour (secondary emphasis)
function parseRichText(text: string, isLightText: boolean): React.ReactNode[] {
  const PATTERN = /\*\*(.+?)\*\*|==(.+?)==|__(.+?)__/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = match.index;

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key} style={{ fontWeight: 900, fontSize: '1.1em', letterSpacing: '-0.02em' }}>
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <mark
          key={key}
          style={{
            background: isLightText ? 'rgba(255,224,0,0.65)' : 'rgba(0,0,0,0.13)',
            color: isLightText ? 'rgba(10,10,10,0.95)' : 'inherit',
            borderRadius: '0.2em',
            padding: '0.05em 0.3em',
            fontWeight: 700,
          }}
        >
          {match[2]}
        </mark>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <span key={key} style={{ color: isLightText ? '#fde68a' : '#3730a3', fontWeight: 700 }}>
          {match[3]}
        </span>
      );
    }

    lastIndex = PATTERN.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Safe, responsive padding that respects device safe areas. */
const SAFE_PAD = {
  top: 'max(clamp(1.25rem, 5vw, 2.5rem), env(safe-area-inset-top, 0px))',
  right: 'max(clamp(1rem, 4vw, 2rem), env(safe-area-inset-right, 0px))',
  bottom: 'max(clamp(1rem, 3vw, 1.5rem), env(safe-area-inset-bottom, 0px))',
  left: 'max(clamp(1rem, 4vw, 2rem), env(safe-area-inset-left, 0px))',
};

interface SlideProps {
  slide: SlideData;
  blogBasePath: string;
  seriesTitle?: string;
}

function Slide({ slide, blogBasePath, seriesTitle }: SlideProps) {
  const theme = THEMES[slide.theme ?? 'ocean'];
  const isLightText = theme.text === '#ffffff';

  const wrapperStyle: React.CSSProperties = {
    background: theme.gradient,
    color: theme.text,
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: SAFE_PAD.top,
    paddingRight: SAFE_PAD.right,
    paddingBottom: SAFE_PAD.bottom,
    paddingLeft: SAFE_PAD.left,
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const decorCircle: React.CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
    background: theme.accent,
    pointerEvents: 'none',
  };

  // Shared layout for the scrollable content area
  const contentArea: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    // Allow content to scroll within the slide without fighting the swipe gesture.
    // overscrollBehavior prevents the page from scrolling when the slide content
    // reaches its boundary.
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain',
    // Hide the scrollbar visually while keeping it functional
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    minHeight: 0,
  };

  if (slide.type === 'cover') {
    return (
      <div style={wrapperStyle}>
        <div
          style={{ ...decorCircle, width: 280, height: 280, top: -80, right: -80 }}
          aria-hidden="true"
        />
        <div
          style={{ ...decorCircle, width: 180, height: 180, bottom: 60, left: -60 }}
          aria-hidden="true"
        />
        <div
          className="slide-content"
          style={{
            ...contentArea,
            alignItems: 'center',
            textAlign: 'center',
            gap: 'clamp(0.75rem, 3vw, 1.25rem)',
          }}
        >
          {seriesTitle && (
            <div
              style={{
                background: 'rgba(255,255,255,0.18)',
                borderRadius: '2rem',
                padding: '0.25rem 0.875rem',
                fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {seriesTitle}
            </div>
          )}
          {slide.icon && (
            <span style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', lineHeight: 1 }}>
              {slide.icon}
            </span>
          )}
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 5vw, 2.25rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {parseRichText(slide.title ?? '', isLightText)}
          </h2>
          {slide.subtitle && (
            <p
              style={{
                fontSize: 'clamp(0.8rem, 3vw, 1.125rem)',
                opacity: 0.85,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {parseRichText(slide.subtitle, isLightText)}
            </p>
          )}
        </div>
        <Branding color={theme.text} seriesTitle={seriesTitle} />
      </div>
    );
  }

  if (slide.type === 'quote') {
    return (
      <div style={wrapperStyle}>
        <div
          style={{ ...decorCircle, width: 220, height: 220, top: -50, left: -50 }}
          aria-hidden="true"
        />
        <div className="slide-content" style={contentArea}>
          <div
            style={{
              fontSize: 'clamp(3rem, 10vw, 5rem)',
              lineHeight: 0.8,
              opacity: 0.4,
              fontFamily: 'Georgia, serif',
              marginBottom: '0.5rem',
              flexShrink: 0,
            }}
          >
            "
          </div>
          <blockquote
            style={{
              fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
              fontWeight: 700,
              lineHeight: 1.5,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {parseRichText(slide.quote ?? '', isLightText)}
          </blockquote>
          <div
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              lineHeight: 0.8,
              opacity: 0.4,
              fontFamily: 'Georgia, serif',
              textAlign: 'right',
              marginTop: '0.5rem',
              flexShrink: 0,
            }}
          >
            "
          </div>
        </div>
        <Branding color={theme.text} seriesTitle={seriesTitle} />
      </div>
    );
  }

  if (slide.type === 'tip') {
    return (
      <div style={wrapperStyle}>
        <div
          style={{ ...decorCircle, width: 200, height: 200, top: -60, right: -60 }}
          aria-hidden="true"
        />
        <div className="slide-content" style={{ ...contentArea, gap: 'clamp(0.625rem, 2.5vw, 1rem)' }}>
          {slide.icon && (
            <span style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)', lineHeight: 1, flexShrink: 0 }}>
              {slide.icon}
            </span>
          )}
          <div
            style={{
              background: theme.accent,
              borderRadius: 'clamp(0.75rem, 3vw, 1rem)',
              padding: 'clamp(1rem, 4vw, 1.25rem) clamp(0.875rem, 3.5vw, 1.5rem)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {slide.title && (
              <h3
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                  fontWeight: 800,
                  margin: '0 0 0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {parseRichText(slide.title, isLightText)}
              </h3>
            )}
            {slide.body && (
              <p
                style={{
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  margin: 0,
                  lineHeight: 1.65,
                  opacity: 0.95,
                  whiteSpace: 'pre-line',
                }}
              >
                {parseRichText(slide.body, isLightText)}
              </p>
            )}
          </div>
        </div>
        <Branding color={theme.text} seriesTitle={seriesTitle} />
      </div>
    );
  }

  if (slide.type === 'list') {
    return (
      <div style={wrapperStyle}>
        <div className="slide-content" style={{ ...contentArea, gap: 'clamp(0.625rem, 2.5vw, 1rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            {slide.icon && (
              <span style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', lineHeight: 1 }}>
                {slide.icon}
              </span>
            )}
            {slide.title && (
              <h3
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {parseRichText(slide.title, isLightText)}
              </h3>
            )}
          </div>
          {slide.bullets && (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.4rem, 1.5vw, 0.625rem)',
              }}
            >
              {slide.bullets.map((bullet, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      background: theme.accent,
                      borderRadius: '50%',
                      width: 'clamp(1.25rem, 5vw, 1.5rem)',
                      height: 'clamp(1.25rem, 5vw, 1.5rem)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      marginTop: '0.1em',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span>{parseRichText(bullet, isLightText)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Branding color={theme.text} seriesTitle={seriesTitle} />
      </div>
    );
  }

  if (slide.type === 'closing') {
    const ctaHref = slide.ctaSlug ? `${blogBasePath}/${slide.ctaSlug}` : undefined;
    return (
      <div style={wrapperStyle}>
        <div
          style={{ ...decorCircle, width: 260, height: 260, bottom: -80, right: -80 }}
          aria-hidden="true"
        />
        <div
          className="slide-content"
          style={{
            ...contentArea,
            alignItems: 'center',
            textAlign: 'center',
            gap: 'clamp(0.75rem, 3vw, 1.25rem)',
          }}
        >
          {slide.icon && (
            <span style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', lineHeight: 1, flexShrink: 0 }}>
              {slide.icon}
            </span>
          )}
          {slide.title && (
            <h3
              style={{
                fontSize: 'clamp(1.1rem, 4vw, 1.75rem)',
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {parseRichText(slide.title, isLightText)}
            </h3>
          )}
          {slide.body && (
            <p
              style={{
                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                margin: 0,
                lineHeight: 1.65,
                opacity: 0.9,
                maxWidth: '28ch',
                whiteSpace: 'pre-line',
              }}
            >
              {parseRichText(slide.body, isLightText)}
            </p>
          )}
          {ctaHref && slide.cta && (
            <a
              href={ctaHref}
              style={{
                display: 'inline-block',
                marginTop: '0.25rem',
                padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1.25rem, 4vw, 1.75rem)',
                background: theme.text,
                color:
                  theme.gradient.includes('#1e293b') || theme.gradient.includes('#0f172a')
                    ? '#ffffff'
                    : '#1e293b',
                borderRadius: '3rem',
                fontWeight: 700,
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              {slide.cta} →
            </a>
          )}
        </div>
        <Branding color={theme.text} seriesTitle={seriesTitle} />
      </div>
    );
  }

  // default: 'content'
  return (
    <div style={wrapperStyle}>
      <div
        style={{ ...decorCircle, width: 200, height: 200, top: -60, right: -60 }}
        aria-hidden="true"
      />
      <div className="slide-content" style={{ ...contentArea, gap: 'clamp(0.625rem, 2.5vw, 1rem)' }}>
        {slide.icon && (
          <span style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)', lineHeight: 1, flexShrink: 0 }}>
            {slide.icon}
          </span>
        )}
        {slide.title && (
          <h3
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.75rem)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            {parseRichText(slide.title, isLightText)}
          </h3>
        )}
        {slide.body && (
          <p
            style={{
              fontSize: 'clamp(0.8rem, 2.5vw, 1.05rem)',
              margin: 0,
              lineHeight: 1.7,
              opacity: 0.95,
              whiteSpace: 'pre-line',
            }}
          >
            {parseRichText(slide.body, isLightText)}
          </p>
        )}
      </div>
      <Branding color={theme.text} seriesTitle={seriesTitle} />
    </div>
  );
}

function Branding({ color, seriesTitle }: { color: string; seriesTitle?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.6,
        marginTop: '0.625rem',
        flexShrink: 0,
        gap: '0.1rem',
      }}
    >
      <span style={{ fontSize: '0.7rem', fontWeight: 600, color, letterSpacing: '0.08em' }}>
        mazipan.space
      </span>
      {seriesTitle && (
        <span
          style={{
            fontSize: '0.6rem',
            fontWeight: 600,
            color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {seriesTitle}
        </span>
      )}
    </div>
  );
}

interface CarouselViewerProps {
  slides: SlideData[];
  blogBasePath?: string;
  seriesTitle?: string;
}

export default function CarouselViewer({ slides, blogBasePath = '/blog', seriesTitle }: CarouselViewerProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  // Height derived from actual container width — guarantees content is never cropped
  // regardless of device size. SSR default of 440 is a reasonable fallback.
  const [slideHeight, setSlideHeight] = useState(440);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  // Measure the rendered width and keep height at 4:5, but enforce a minimum
  // of 400px so slides aren't too short on narrow phones.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      setSlideHeight(Math.min(Math.max(Math.round(w * 1.25), 400), 520));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 350);
    },
    [animating, current]
  );

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [goTo, current]);
  const next = useCallback(() => goTo(Math.min(total - 1, current + 1)), [goTo, current, total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Only fire if the gesture is primarily horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const theme = THEMES[slides[current]?.theme ?? 'ocean'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        userSelect: 'none',
        width: '100%',
        // Respect horizontal safe areas (iPhone landscape notch area)
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      {/* Slide counter */}
      <div style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.6, letterSpacing: '0.05em' }}>
        {current + 1} / {total}
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '4px', width: '100%', maxWidth: 480 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              background: i <= current ? theme.gradient : 'rgba(128,128,128,0.25)',
              transition: 'background 0.35s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Slide viewport — height set by ResizeObserver to guarantee no cropping */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          height: `${slideHeight}px`,
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35)',
        }}
        role="region"
        aria-label="Carousel slides"
      >
        {/* Slides track */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${current * 100}%)`,
            transition: animating ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ flexShrink: 0, width: '100%', height: '100%' }}
              aria-hidden={i !== current}
            >
              <Slide slide={slide} blogBasePath={blogBasePath} seriesTitle={seriesTitle} />
            </div>
          ))}
        </div>

        {/* Tap-area overlays for prev/next — positioned so they don't cover center content */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '20%',
            background: 'transparent',
            border: 'none',
            cursor: current === 0 ? 'default' : 'pointer',
          }}
        />
        <button
          onClick={next}
          disabled={current === total - 1}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '20%',
            background: 'transparent',
            border: 'none',
            cursor: current === total - 1 ? 'default' : 'pointer',
          }}
        />
      </div>

      {/* Arrow buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <NavButton onClick={prev} disabled={current === 0} label="Previous slide" direction="prev" />
        <span style={{ fontSize: '0.8rem', opacity: 0.5, width: '4rem', textAlign: 'center' }}>
          {current + 1} of {total}
        </span>
        <NavButton
          onClick={next}
          disabled={current === total - 1}
          label="Next slide"
          direction="next"
        />
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background:
                i === current
                  ? THEMES[slide.theme ?? 'ocean'].gradient
                  : 'rgba(128,128,128,0.3)',
              transition: 'all 0.35s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: '0.75rem', opacity: 0.45, margin: 0, textAlign: 'center' }}>
        Swipe or tap sides to navigate
      </p>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  direction,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  direction: 'prev' | 'next';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1.5px solid currentColor',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.25 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
        color: 'currentColor',
      }}
    >
      {direction === 'prev' ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}
