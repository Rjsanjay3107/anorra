"use client";

import { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/utils';

interface BannerSlide {
  src: string;
  type: 'image' | 'video';
  alt?: string;
}

interface HeroBannerProps {
  slides: BannerSlide[];
  autoInterval?: number;
  slideSpeed?: number;
}

export function HeroBanner({ slides, autoInterval = 3000, slideSpeed = 0.5 }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, slideSpeed * 1000);
    }, autoInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoInterval, slideSpeed]);

  useEffect(() => {
    if (videoRef.current && slides[currentIndex].type === 'video') {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, slides]);

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, slideSpeed * 1000);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden" onClick={() => currentIndex === 0 && scrollToSection('products')}>
      {/* Mobile-only container with 26vh height */}
      <div className="md:hidden lg:hidden relative w-full h-[26vh]">
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {slide.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <video
                      ref={index === currentIndex ? videoRef : undefined}
                      src={slide.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-auto h-full max-w-full object-contain md:px-8"
                    />
                  </div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${index === 0 ? 'bg-black' : ''}`}>
                    <img
                      src={slide.src}
                      alt={slide.alt || `Slide ${index + 1}`}
                      className={`${index === 0 ? 'h-full w-auto' : 'w-full h-full object-cover'}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop and tablet container (unchanged) */}
      <div className="hidden md:block lg:block absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {slide.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={index === currentIndex ? videoRef : undefined}
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-auto h-full max-w-full object-contain px-8"
                  />
                </div>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${index === 0 ? 'bg-black' : ''}`}>
                  <img
                    src={slide.src}
                    alt={slide.alt || `Slide ${index + 1}`}
                    className={`${index === 0 ? 'h-full w-auto' : 'w-full h-full object-cover'}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-black/20 z-20" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1 md:bottom-8 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 rounded-full transition-all duration-500 md:h-1 ${
              index === currentIndex
                ? 'bg-white w-6 md:w-12'
                : 'bg-white/40 w-3 md:w-6 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
