
export const COOKIE_KEY = {
    USER_INFO: 'userInfo',
    USER_LOCALE: 'userLocale'
}

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const CONFIG = {
    serverPath: NODE_ENV === "development"? "http://localhost:5000": "https://musicalbest.com"
}