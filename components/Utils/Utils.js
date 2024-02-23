/* eslint-disable require-jsdoc, no-invalid-this */
export function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


export function mapValue(value, minValue, maxValue, minRange, maxRange) {
  return (value - minValue) * (maxRange - minRange) / (maxValue - minValue) + minRange;
}
/* eslint-enable require-jsdoc, no-invalid-this */
