export const queryfy = (obj) => {
  if (typeof obj === 'number') {
    return obj;
  }

  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj).replace(/"([^(")"]+)":/g, '$1:');
  }

  const props = Object.keys(obj)
    .map((key) => `${key}:${queryfy(obj[key])}`)
    .join(',');

  return `{${props}}`;
};
