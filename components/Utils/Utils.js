export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


export function mapValue(value, minValue, maxValue, minRange, maxRange) {
  return (value - minValue) * (maxRange - minRange) / (maxValue - minValue) + minRange;
}
