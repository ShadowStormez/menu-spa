export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle: boolean;
  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
