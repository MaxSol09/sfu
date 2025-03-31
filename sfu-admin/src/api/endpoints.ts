const BASE_URL = 'https://sfu-4bm4.onrender.com'
const BASE_URL_LOCAL = 'http://localhost:4444'

export const API_ENDPOINTS_REAL = {
    QUESTIONS: {
        GET_QUESTIONS: `${BASE_URL}/questions`,
        GET_TAGS: `${BASE_URL}/tags`,
        CREATE_QUESTION: `${BASE_URL}/question/create`,
        MODERATION_QUESTION: `${BASE_URL}/question/moderation`,
        DELETE_QUESTION: `${BASE_URL}/question/delete`,
        CREATE_COMMENT: `${BASE_URL}/create/comment`,
        DELETE_COMMENT: `${BASE_URL}/delete/comment`,
        CREATE_LIKE: `${BASE_URL}/question/like`,
        UPLOAD: `${BASE_URL}/upload`
    },
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        DELETE_USER: `${BASE_URL}/user/delete`,
        USER_BAN: `${BASE_URL}/user/ban`,
        USER_SPECIALITY: `${BASE_URL}/user/speciality`,
        GET_ME: `${BASE_URL}/auth/me`,
        GET_ALL_USERS: `${BASE_URL}/users`,
        CHANGE_AVATAR: `${BASE_URL}/user/img`,
        CHANGE_BACKGROUND: `${BASE_URL}/user/background`,
        CHANGE_TEXT: `${BASE_URL}/user/text`,
        COMPLAINTS: `${BASE_URL}/complaints`,
        COMPLAINT_CREATE: `${BASE_URL}/complaint/create`,
        COMPLAINT_DELETE: `${BASE_URL}/complaint/delete`,
        SEND_MESSAGE: `${BASE_URL}/send/message`
    }
}



export const API_ENDPOINTS = {
    QUESTIONS: {
        GET_QUESTIONS: `${BASE_URL_LOCAL}/questions`,
        GET_TAGS: `${BASE_URL_LOCAL}/tags`,
        CREATE_QUESTION: `${BASE_URL_LOCAL}/question/create`,
        MODERATION_QUESTION: `${BASE_URL_LOCAL}/question/moderation`,
        DELETE_QUESTION: `${BASE_URL_LOCAL}/question/delete`,
        CREATE_COMMENT: `${BASE_URL_LOCAL}/create/comment`,
        DELETE_COMMENT: `${BASE_URL_LOCAL}/delete/comment`,
        CREATE_LIKE: `${BASE_URL_LOCAL}/question/like`,
        UPLOAD: `${BASE_URL_LOCAL}/upload`
    },
    AUTH: {
        LOGIN: `${BASE_URL_LOCAL}/auth/login`,
        REGISTER: `${BASE_URL_LOCAL}/auth/register`,
        DELETE_USER: `${BASE_URL_LOCAL}/user/delete`,
        USER_BAN: `${BASE_URL_LOCAL}/user/ban`,
        USER_SPECIALITY: `${BASE_URL_LOCAL}/user/speciality`,
        GET_ME: `${BASE_URL_LOCAL}/auth/me`,
        GET_ALL_USERS: `${BASE_URL_LOCAL}/users`,
        CHANGE_AVATAR: `${BASE_URL_LOCAL}/user/img`,
        CHANGE_BACKGROUND: `${BASE_URL_LOCAL}/user/background`,
        CHANGE_TEXT: `${BASE_URL_LOCAL}/user/text`,
        COMPLAINTS: `${BASE_URL_LOCAL}/complaints`,
        COMPLAINT_CREATE: `${BASE_URL_LOCAL}/complaint/create`,
        COMPLAINT_DELETE: `${BASE_URL_LOCAL}/complaint/delete`,
        SEND_MESSAGE: `${BASE_URL_LOCAL}/send/message`
    }
}