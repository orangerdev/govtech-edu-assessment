/**
 * Get data from localStorage
 * @param string key
 * @returns mixed|null
 */
export const getFromStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  return null
}

/**
 * Set data to localStorage
 * @param string key
 * @param mixed value
 */
export const setToStorage = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}
