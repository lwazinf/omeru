'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';

interface AnimatedElementProps {
  children: React.ReactNode;
  type: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  type,
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on animation type
    let initialProps: gsap.TweenVars = {};
    switch (type) {
      case 'fade-up':
        initialProps = { y: 50, opacity: 0 };
        break;
      case 'fade-down':
        initialProps = { y: -50, opacity: 0 };
        break;
      case 'fade-left':
        initialProps = { x: -50, opacity: 0 };
        break;
      case 'fade-right':
        initialProps = { x: 50, opacity: 0 };
        break;
      case 'zoom-in':
        initialProps = { scale: 0.9, opacity: 0 };
        break;
      case 'zoom-out':
        initialProps = { scale: 1.1, opacity: 0 };
        break;
      default:
        initialProps = { opacity: 0 };
    }

    // Apply initial state
    gsap.set(element, initialProps);

    // Create animation
    const animation = gsap.to(element, {
      ...initialProps,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
    };
  }, [type, delay, duration, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedElement; 