export const classnames = classes =>
  Object.keys(classes)
    .filter(k => !!classes[k])
    .join(" ");

Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.flatMap = function(fn) {
  return this.map(fn).flatten();
}

Array.prototype.flatten = function() {
  return this.reduce((acc, curr) => {
    if (Array.isArray(curr))
      return acc.concat(curr.flatten());
    return acc.concat([curr]);
  }, []);
};
