export const classnames = classes =>
  Object.keys(classes)
    .filter(k => !!classes[k])
    .join(" ");