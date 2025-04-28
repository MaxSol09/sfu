import { create } from "zustand";
import { Message, Messages, UserData } from "../types/types";

interface UserStore {
    state: UserData | {},
    users: UserData[] | [],
    user: {
        value: UserData | {}
    },
    userAvatar: {
        value: null | string
    },
    userBackground: {
        value: null | string
    },
    messages: [] | Messages[],
    messagesArr: [] | Messages[],
    usersArr: UserData[] | [],
    selectChat: {
        id: string,
        chat: Message[]
    },
    resetUser: () => void,
    getUsers: (data: UserData[] | []) => void,
    getStudents: () => void,
    getOldUsers: () => void,
    getApplicants: () => void,
    getBanUsers: () => void,
    getNotBanUsers: () => void,
    findUser: (name: string) => void,
    addUser: (user: UserData) => void,
    deleteUser: (id: string) => void,
    banUser: (user: UserData) => void,
    getUser: (id: UserData) => void,
    sendAvatar: (val: string) => void,
    sendBg: (val: string) => void,
    changeStudentSpeciality: (text: string) => void,
    getMessages: (data: UserData[]) => void,
    selectChatFn: (id: string, chat: Message[]) => void,
    sendMessage: (user: UserData) => void,
    findUserMessages: (name: string) => void,
    loginAdmin: (data: UserData) => void,
    getMe: (data: UserData) => void
}

export const useUserStore = create<UserStore>((set) => ({
    state: {},
    users: [],
    usersArr: [],
    user: {
        value: []
    },
    userAvatar: {
        status: 'none',
        value: null
    },
    userBackground: {
        status: 'none',
        value: null
    },
    messages: [],
    messagesArr: [],
    selectChat: {
        id: '',
        chat: []
    },
    resetUser: () => set({user: {value: {}}}),
    loginAdmin: (data: UserData) => set({state: data}),
    getUsers: (data: UserData[] | []) => set(() => ({
        users: data,
        usersArr: data
    })),
    getUser: (data: UserData) => set(() => {
        return {
            user: {
                value: data
            }
        }
    }),
    getMe: (data: UserData) => set({
        state: data
    }), 
    getStudents: () => set(state => ({
        users: [...state.usersArr].filter(el => el.role === 'Студент')
    })),
    getApplicants: () => set(state => ({
        users: [...state.usersArr].filter(el => el.role === 'Абитуриент')
    })),
    getOldUsers: () => set(state => ({
        users: [...state.usersArr].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    })),
    getBanUsers: () => set(state => ({
        users: [...state.usersArr].filter(el => el.ban === true)
    })),
    getNotBanUsers: () => set(state => ({
        users: [...state.usersArr].filter(el => el.ban === false)
    })),
    findUser: (name: string) => set(state => {

        const findUser = [...state.usersArr].filter(el => el.email === name)

        if(findUser.length){
            return {users: findUser}
        }

        return {
            users: [...state.usersArr].filter(el => el.fullName === name)
        }

    }),
    findUserMessages: (name: string) => set(state => {

        const findUser = [...state.messages].filter(el => el.fullName === name)

        if(name.length){
            return {messagesArr: findUser}
        }
        else{
            return {messagesArr: [...state.messages]}
        }

    }),
    addUser: (user: UserData) => set(state => ({
        usersArr: [user, ...state.usersArr],
        users: [user, ...state.usersArr]
    })),
    deleteUser: (id: string) => set(state => ({
        users: [...state.usersArr].filter(el => el._id !== id),
        usersArr: [...state.usersArr].filter(el => el._id !== id)
    })),
    banUser: (user: UserData) => set(state => {

        const filterUsersArr = [...state.usersArr].map(el => el._id === user._id ? user : el)
        const filterUsers = [...state.users].map(el => el._id === user._id ? user : el)

        return {
            usersArr: filterUsersArr,
            users: filterUsers
        }
        
    }),
    sendAvatar: (val: string) => set(state => {
        return {
            userAvatar: {
                value: val
            },
            user: {
                value: {...state.user.value, avatarUrl: val}
            }
        }
    }),
    sendBg: (val) => set(state => {

        return {
            userBackground: {
                value: val
            },
            user: {
                value: {...state.user.value, backgroundProfile: val}
            }
        }

    }),
    changeStudentSpeciality: (text) => set(state => ({
        user: {value: {...state.user.value, speciality: text}}
    })),
    getMessages: (data) => set({
        messagesArr: data.map(el => ({
            fullName: el.fullName,
            avatar: el.avatarUrl,
            userID: el._id,
            chat: el.chat
        })).filter(el => el.chat.length > 0).sort((a, b) => {
            let c = new Date(a.chat[a.chat.length - 1].date).getTime();
            let d = new Date(b.chat[b.chat.length - 1].date).getTime();

            console.log(b)
            console.log(a)

            return d-c;
        }),
        messages: data.map(el => ({
            fullName: el.fullName,
            avatar: el.avatarUrl,
            userID: el._id,
            chat: el.chat
        })).filter(el => el.chat.length > 0).sort((a, b) => {
            let c = new Date(a.chat[a.chat.length - 1].date).getTime();
            let d = new Date(b.chat[b.chat.length - 1].date).getTime();

            console.log(b)
            console.log(a)

            return d-c;
        })
    }),
    selectChatFn: (id, chat) => set({
        selectChat: {
            id: id,
            chat: chat
        }
    }),
    sendMessage: (user) => set(state => ({
        selectChat: {
            id: user._id,
            chat: user.chat
        },
        users: [...state.users].map(el => {
            if(el._id === user._id){
                return {...el, chat: user.chat}
            }
            else{
                return el
            }
        }),   
        messages: [...state.users].map(el => { // обновляем messages после обновления users
            if(el._id === user._id){
                return {...el, chat: user.chat}
            }
            else{
                return el
            }
        }).map(el => ({
            fullName: el.fullName,
            avatar: el.avatarUrl,
            userID: el._id,
            chat: el.chat
        })).filter(el => el.chat.length > 0).sort((a, b) => {
            let c = new Date(a.chat[a.chat.length - 1].date).getTime();
            let d = new Date(b.chat[b.chat.length - 1].date).getTime();
            return d - c;
        }),
        messagesArr: [...state.users].map(el => { // обновляем messages после обновления users
            if(el._id === user._id){
                return {...el, chat: user.chat}
            }
            else{
                return el
            }
        }).map(el => ({
            fullName: el.fullName,
            avatar: el.avatarUrl,
            userID: el._id,
            chat: el.chat
        })).filter(el => el.chat.length > 0).sort((a, b) => {
            let c = new Date(a.chat[a.chat.length - 1].date).getTime();
            let d = new Date(b.chat[b.chat.length - 1].date).getTime();
            return d - c;
        })
    }))
}))


