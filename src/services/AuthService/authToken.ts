export const TOKEN_KEY = "access_token";
export const USER_ID = "uid";
export const EMAIL = "email";
export const PHONE = "phone";
export const IS_ADMIN = "admin";

export const setAuthToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const setUserInfo = (uid: string, email:string, phone:string, admin:string) => {
    localStorage.setItem(USER_ID, uid)
    localStorage.setItem(EMAIL, email)
    localStorage.setItem(PHONE, phone)
    localStorage.setItem(IS_ADMIN, admin)
}

export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const getUserInfo = () => {
    return {
        uid: localStorage.getItem(USER_ID),
        email: localStorage.getItem(EMAIL),
        phone: localStorage.getItem(PHONE),
        is_admin: localStorage.getItem(IS_ADMIN)
    }
}

export const removeAuthToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EMAIL)
    localStorage.removeItem(PHONE)
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(IS_ADMIN)
}

