import Cookies from "js-cookie";

export const loadState = (key, defaultValue) => {
  const cookie = Cookies.get(key);
  return cookie ? JSON.parse(cookie) : defaultValue;
};

export const saveState = (key, value, options = {}) => {
  Cookies.set(key, JSON.stringify(value), {
    ...options,
    secure: true,
    sameSite: "Strict",
    expires: 1 / 48,
    ...options,
  });
};

export const removeState = (key) => {
  Cookies.remove(key);
};
