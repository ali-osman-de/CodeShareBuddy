export const loadState = (key, defaultValue) => {
    const state = JSON.parse(sessionStorage.getItem(key));
    return state || defaultValue;
  };
  
  export const saveState = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  
  export const removeState = (key) => {
    sessionStorage.removeItem(key);
  };
  