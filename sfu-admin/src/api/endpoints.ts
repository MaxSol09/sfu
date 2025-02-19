const BASE_URL = 'http://localhost:4444'


export const API_ENDPOINTS = {
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