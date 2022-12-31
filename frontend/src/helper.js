export const generateRandomId = (length) => {
  const rand = Math.random().toString(16).substr(2, length);
  return rand;
};

export const getShortname = (name) => {
  name.trim();
  let sn = name[0];
  let idx = name.indexOf(" ");
  if (idx >= 0) {
    sn += name[idx + 1];
  } else {
    sn += name[1];
  }
  return sn.toUpperCase();
};
