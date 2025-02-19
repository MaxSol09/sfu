import { TypePost, UserData } from "../types/types";


export const isUser = (value: any): value is UserData => {
    if(value === null) return false
    
    return Boolean('_id' in value)
}
export const isPost = (obj: any): obj is TypePost => Boolean(obj._id);
