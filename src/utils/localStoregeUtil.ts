export const setLocalStorage = (key: string, value: any) => localStorage.setItem(key, value)
export const getLocalStorage = (key: string) => localStorage.getItem(key)
export const removeLocalStorage = (key: string) => localStorage.removeItem(key)

export const getUserToken = () => getLocalStorage('token')
