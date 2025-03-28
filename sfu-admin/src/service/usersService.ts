import axios from "axios"
import { API_ENDPOINTS } from "../api/endpoints"
import { MessageSubmit } from "../types/types"

interface DataRegister {
    fullName: string,
    role: 'Студент' | 'Абитуриент',
    email: string,
    speciality: string,
    password: string
}

interface DataBan {
    type: 'ban' | 'unban',
    userID: string,
    text?: string
}

class UsersService {

    getAllUsers() {
        const data = axios.get(API_ENDPOINTS.AUTH.GET_ALL_USERS)
    
        return data
    }

    registerUser(DataRegister: DataRegister) {
        const data = axios.post(API_ENDPOINTS.AUTH.REGISTER, DataRegister)

        return data
    }

    deleteUser(userID: string){
        console.log(userID)

        const data = axios.post(API_ENDPOINTS.AUTH.DELETE_USER, {userID})

        return data
    }

    banUser(dataBan: DataBan){
        const data = axios.post(API_ENDPOINTS.AUTH.USER_BAN, dataBan)

        return data
    }

    getUser(id: string){
        const data = axios.get(`https://sfu-4bm4.onrender.com/user/${id}`)

        return data
    }

    changeAvatar = (dataAvatar: {id: string, avatar: string}) => {

        const data = axios.post(API_ENDPOINTS.AUTH.CHANGE_AVATAR, dataAvatar)
    
        return data
    }

    
    sendAvatar (formData: object) {
        const data = axios.post(API_ENDPOINTS.QUESTIONS.UPLOAD, formData)

        console.log(formData)

        return data
    }

    changeBackground (backData: {id: string, backgroundProfile: string}) {
        const data = axios.post(API_ENDPOINTS.AUTH.CHANGE_BACKGROUND, backData)

        console.log(data)
        
        return data
    }

    sendBackground (formData: object) {
        const data = axios.post(API_ENDPOINTS.QUESTIONS.UPLOAD, formData)

        return data
    }

    changeTextFun (textData: {userID: string, text: string}) {
        console.log(textData)
        const data = axios.post(API_ENDPOINTS.AUTH.CHANGE_TEXT, textData)
    
        return data
    }

    changeUserSpeciality (userData: {userID: string, speciality: string}) {
        const data = axios.post(API_ENDPOINTS.AUTH.USER_SPECIALITY, userData)

        return data
    }

    getAllComplaints() {
        const data = axios.get(API_ENDPOINTS.AUTH.COMPLAINTS)

        return data
    }

    deleteComplaint(userData: {userID: string, autherID: string}){
        const data = axios.post(API_ENDPOINTS.AUTH.COMPLAINT_DELETE, userData)

        return data
    }

    sendMessage(message: MessageSubmit){
        const data = axios.post(API_ENDPOINTS.AUTH.SEND_MESSAGE, message)

        return data
    }
    
}

export const usersService = new UsersService()

