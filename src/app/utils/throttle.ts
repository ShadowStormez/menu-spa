export const throttle = <F extends (...args: unknown[]) => void>(func: F, limit: number) => {
  let inThrottle = false;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
