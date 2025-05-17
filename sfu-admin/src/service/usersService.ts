import axios from "axios"
import { API_ENDPOINTS_REAL } from "../api/endpoints"
import { MessageSubmit } from "../types/types"

interface DataRegister {
    fullName: string,
    role: 'Студент' | 'Абитуриент' | 'Админ',
    email: string,
    password: string
}

interface DataBan {
    type: 'ban' | 'unban',
    userID: string,
    text?: string
}

interface DataLogin {
    password: string,
    email: string
}

interface DataChangeRole {
    role: 'Студент' | 'Админ' | 'Абитуриент',
    userID: string
}

class UsersService {

    getAllUsers() {
        const data = axios.get(API_ENDPOINTS_REAL.AUTH.GET_ALL_USERS)
    
        return data
    }

    changeUserRole(changeRoleData: DataChangeRole){
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.CHANGE_ROLE, changeRoleData)
        
        return data
    }

    getMe() {
        
        const data = axios.get(API_ENDPOINTS_REAL.AUTH.GET_ME)

        return data

    }

    registerUser(DataRegister: DataRegister) {
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.REGISTER, DataRegister)

        return data
    }

    loginUser(dataLogin: DataLogin){
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.LOGIN, dataLogin)

        return data
    }

    deleteUser(userID: string){
        console.log(userID)

        const data = axios.post(API_ENDPOINTS_REAL.AUTH.DELETE_USER, {userID})

        return data
    }

    banUser(dataBan: DataBan){
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.USER_BAN, dataBan)

        return data
    }

    getUser(id: string){
        const data = axios.get(`https://sfu-server-yx7u.onrender.com/user/${id}`)

        return data
    }

    changeAvatar = (dataAvatar: {id: string, avatar: string}) => {

        const data = axios.post(API_ENDPOINTS_REAL.AUTH.CHANGE_AVATAR, dataAvatar)
    
        return data
    }

    
    sendAvatar (formData: object) {
        const data = axios.post(API_ENDPOINTS_REAL.QUESTIONS.UPLOAD, formData)

        console.log(formData)

        return data
    }

    changeBackground (backData: {id: string, backgroundProfile: string}) {
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.CHANGE_BACKGROUND, backData)

        console.log(data)
        
        return data
    }

    sendBackground (formData: object) {
        const data = axios.post(API_ENDPOINTS_REAL.QUESTIONS.UPLOAD, formData)

        return data
    }

    changeTextFun (textData: {userID: string, text: string}) {
        console.log(textData)
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.CHANGE_TEXT, textData)
    
        return data
    }

    changeUserSpeciality (userData: {userID: string, speciality: Array<string>}) {
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.USER_SPECIALITY, userData)

        return data
    }

    getAllComplaints() {
        const data = axios.get(API_ENDPOINTS_REAL.AUTH.COMPLAINTS)

        return data
    }

    deleteComplaint(userData: {userID: string, autherID: string}){
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.COMPLAINT_DELETE, userData)

        return data
    }

    sendMessage(message: MessageSubmit){
        const data = axios.post(API_ENDPOINTS_REAL.AUTH.SEND_MESSAGE, message)

        return data
    }
    
}

export const usersService = new UsersService()

