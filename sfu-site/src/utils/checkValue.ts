import { UserData } from "../redux/auth";
import { TypePost } from "../redux/questions";


export const isUser = (value: any): value is UserData => Boolean(value._id)
export const isPost = (obj: any): obj is TypePost => Boolean(obj._id);
