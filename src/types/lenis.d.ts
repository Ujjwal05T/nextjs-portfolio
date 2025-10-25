declare module 'lenis' {
  export default class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (t: number) => number;
      orientation?: 'vertical' | 'horizontal';
      gestureOrientation?: 'vertical' | 'horizontal' | 'both';
      smoothWheel?: boolean;
      wheelMultiplier?: number;
      touchMultiplier?: number;
      infinite?: boolean;
      syncTouch?: boolean;
    });

    on(event: 'scroll', callback: () => void): void;
    on(event: string, callback: (data?: unknown) => void): void;
    off(event: 'scroll', callback: () => void): void;
    off(event: string, callback: (data?: unknown) => void): void;
    raf(time: number): void;
    scroll: number;
    scrollTo(value: number, options?: { duration?: number; easing?: (t: number) => number; offset?: number }): void;
    destroy(): void;
  }
}