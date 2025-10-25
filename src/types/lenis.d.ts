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

    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    raf(time: number): void;
    scroll: number;
    destroy(): void;
  }
}