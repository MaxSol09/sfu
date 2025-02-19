import { TypePost, UserData } from "../types/types";


export const isUser = (value: any): value is UserData => {
    return Boolean('_id' in value)
}
export const isPost = (obj: any): obj is TypePost => Boolean(obj._id)
export const isSendBan = (user: UserData, id: string) => {
    if (!user.complaints || !Array.isArray(user.complaints)) {
        return false
    }

    console.log(user.complaints)
    return user.complaints.find(el => el.auther !== null ? el.auther._id === id : '') !== undefined
}
