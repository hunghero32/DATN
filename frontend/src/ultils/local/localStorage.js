export const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  export const getLocal = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };