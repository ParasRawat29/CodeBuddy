exports.generateRandomId = (length) => {
  const rand = Math.random().toString(16).substr(2, length);
  return rand;
};
