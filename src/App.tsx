import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES_DATA = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    title: 'HOODIE BOY',
    ghostText: 'HOODIE',
    desc: 'The comfy champion of streetwear. Hand-sculpted details, soft-touch matte finish, and a vibrant orange aura.',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    title: 'FOREST GIRL',
    ghostText: 'FOREST',
    desc: 'Adorned in natural moss-green hues. A symbol of curiosity and adventure, perfect for your desk setup.',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    title: 'NEKO CHAN',
    ghostText: 'NEKO',
    desc: 'Cute pink kitty hoodie featuring playful cat ears. High-grade premium vinyl finish with micro-textured surfaces.',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    title: 'CHILL BOY',
    ghostText: 'CHILLY',
    desc: 'The epitome of cozy style. Dressed in sky-blue winter wear with clean details and custom collector packaging.',
  },
  {
    src: '/5.png',
    bg: '#F0B839',
    panel: '#F2C761',
    title: 'CHIC GIRL',
    ghostText: 'CHICKY',
    desc: 'Basking in golden warmth. Dressed in a charming chick-yellow hoodie with high-fidelity soft-vinyl texturing.',
    needsMultiply: true,
  },
  {
    src: '/6.png',
    bg: '#805CB5',
    panel: '#9677C7',
    title: 'DINO BOY',
    ghostText: 'DINO',
    desc: 'Sturdy, playful, and legendary. Featuring custom dino-scale accents, soft-knit hood, and vibrant grape tone.',
    needsMultiply: true,
  },
  {
    src: '/7.png',
    bg: '#DE4747',
    panel: '#E36666',
    title: 'PANDA GIRL',
    ghostText: 'PANDA',
    desc: 'Playful, wild, and incredibly cozy. Handcrafted details inspired by red pandas with a crimson-red collection aura.',
    needsMultiply: true,
  },
];

const GRAIN_SVG_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(%23noise)" opacity="0.08"/></svg>`;

// Helper function to remove solid white background in the client browser with smooth anti-aliased edges
function cleanImageBackground(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Filter out pixels close to pure white using Euclidean vector distance with smooth anti-aliasing
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean distance from pure white (255, 255, 255)
        const dist = Math.sqrt(
          Math.pow(255 - r, 2) +
          Math.pow(255 - g, 2) +
          Math.pow(255 - b, 2)
        );

        if (dist < 18) {
          data[i + 3] = 0; // Pure transparent for background
        } else if (dist < 42) {
          // Smooth blend alpha for anti-aliasing borders/shadows
          const factor = (dist - 18) / (42 - 18);
          data[i + 3] = Math.min(data[i + 3], Math.floor(factor * 255));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      resolve(src);
    };
  });
}

export default function App() {
  const [images, setImages] = useState(IMAGES_DATA);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // States for text crossfade to avoid absolute position overlap bugs
  const [displayTextIndex, setDisplayTextIndex] = useState<number>(0);
  const [textOpacity, setTextOpacity] = useState<number>(1);

  const N = images.length;

  // Process generated white-background images on mount and pre-cache all of them
  useEffect(() => {
    const processAllImages = async () => {
      const processed = await Promise.all(
        IMAGES_DATA.map(async (item) => {
          if (item.needsMultiply) {
            try {
              const transparentSrc = await cleanImageBackground(item.src);
              return { ...item, src: transparentSrc };
            } catch (err) {
              console.error('Failed to clean image background', err);
            }
          }
          // Normal preloading
          const img = new Image();
          img.src = item.src;
          return item;
        })
      );
      setImages(processed);
    };

    processAllImages();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync text changes with a beautiful fade out/in transition
  useEffect(() => {
    if (activeIndex === displayTextIndex) return;

    setTextOpacity(0);

    const timeout = setTimeout(() => {
      setDisplayTextIndex(activeIndex);
      setTextOpacity(1);
    }, 220);

    return () => clearTimeout(timeout);
  }, [activeIndex, displayTextIndex]);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % N;
      } else {
        return (prev + N - 1) % N;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRoleStyle = (index: number): React.CSSProperties => {
    // Relative circular distance from activeIndex (supports any N)
    let diff = index - activeIndex;
    if (diff < -Math.floor(N / 2)) diff += N;
    if (diff > Math.floor(N / 2)) diff -= N;

    if (diff === 0) {
      // Center
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0',
      };
    }
    if (diff === -1) {
      // Left
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }
    if (diff === 1) {
      // Right
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    }

    // Background slides (fade out and push to back)
    const isAdjacentBack = Math.abs(diff) === 2;
    return {
      transform: 'translateX(-50%) scale(0.85)',
      filter: 'blur(4px)',
      opacity: isAdjacentBack ? 0.3 : 0,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
      pointerEvents: 'none',
    };
  };

  return (
    <div
      style={{
        backgroundColor: images[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* 1. Grain overlay (with subtle move/flicker animation for premium texture) */}
        <div
          style={{
            zIndex: 50,
            opacity: 0.35,
            backgroundImage: `url('${GRAIN_SVG_URI}')`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
          className="absolute inset-0 pointer-events-none animate-grain"
        />

        {/* 2. Giant ghost texts crossfading with scale/opacity changes */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          {images.map((image, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(70px, 24vw, 360px)',
                  fontWeight: 900,
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.35)',
                  color: 'transparent',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0.85})`,
                  transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), transform 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="uppercase whitespace-nowrap"
              >
                {image.ghostText}
              </div>
            );
          })}
        </div>

        {/* 3. Top-left brand label "TOONHUB" */}
        <div
          style={{ zIndex: 60 }}
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]"
        >
          TOONHUB
        </div>

        {/* HUD Stats Details (Top Right) */}
        <div
          style={{ zIndex: 60 }}
          className="absolute top-6 right-4 sm:right-8 flex items-center gap-6 text-white text-[10px] sm:text-xs font-medium tracking-[0.15em] opacity-80 pointer-events-none select-none"
        >
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] opacity-60">CATALOGUE</span>
            <span>EDITION 2026.B</span>
          </div>
          <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>COLLECTION LIVE</span>
          </div>
        </div>

        {/* 4. Carousel (with card showcases sliding behind figurines) */}
        <div style={{ zIndex: 3 }} className="absolute inset-0">
          {images.map((image, index) => {
            const roleStyle = getRoleStyle(index);
            const isCenter = index === activeIndex;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition: 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity, left',
                  ...roleStyle,
                }}
                className="group"
              >
                {/* Collector Glass Panel Backing */}
                <div
                  style={{
                    backgroundColor: image.panel + '2b', // ~17% transparency
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className={`absolute inset-x-4 sm:inset-x-8 top-1/4 bottom-2 -z-10 rounded-[28px] border backdrop-blur-[6px] transition-all group-hover:scale-[1.03] group-hover:border-white/30 ${
                    isCenter ? 'opacity-100' : 'opacity-70'
                  }`}
                />

                <img
                  src={image.src}
                  alt={`Toonhub figurine ${index + 1}`}
                  className={`w-full h-full object-contain object-bottom select-none transition-transform duration-300 group-hover:scale-[1.04] ${
                    isCenter ? 'float-active' : ''
                  }`}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          style={{ zIndex: 60, maxWidth: '320px' }}
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 flex flex-col text-white"
        >
          {/* Content Container */}
          <div
            style={{
              opacity: textOpacity,
              transform: `translateY(${textOpacity === 1 ? 0 : 8}px)`,
              transition: 'opacity 220ms ease-in-out, transform 220ms ease-in-out',
            }}
            className="mb-4 sm:mb-6 min-h-[36px] sm:min-h-[110px]"
          >
            <h2
              style={{ letterSpacing: '0.02em', textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}
              className="text-white opacity-95 uppercase font-bold text-base sm:text-[22px] mb-2 sm:mb-3 leading-none"
            >
              {images[displayTextIndex].title}
            </h2>
            <p
              style={{ lineHeight: 1.6, textShadow: '0 1px 8px rgba(0, 0, 0, 0.12)' }}
              className="hidden sm:block text-xs sm:text-sm text-white opacity-85"
            >
              {images[displayTextIndex].desc}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent hover:scale-[1.08] hover:bg-white/12 active:scale-95 disabled:opacity-50 outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous figurine"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              disabled={isAnimating}
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent hover:scale-[1.08] hover:bg-white/12 active:scale-95 disabled:opacity-50 outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next figurine"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Dynamic Carousel Slide Indicators (Bottom Center) */}
        <div
          style={{ zIndex: 60 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3"
        >
          {images.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isAnimating || isActive) return;
                  setIsAnimating(true);
                  setActiveIndex(idx);
                  setTimeout(() => setIsAnimating(false), 650);
                }}
                style={{
                  transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className={`h-2 rounded-full outline-none focus:ring-2 focus:ring-white/40 ${
                  isActive
                    ? 'w-8 sm:w-12 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <a
          href="#"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center text-white opacity-95 hover:opacity-100 transition-opacity duration-200 uppercase no-underline group"
        >
          <span>DISCOVER IT</span>
          <ArrowRight
            strokeWidth={2.25}
            className="w-5 h-5 sm:w-8 sm:h-8 ml-2 sm:ml-4 transition-transform group-hover:translate-x-2 duration-300"
          />
        </a>
      </div>
    </div>
  );
}
