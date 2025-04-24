import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { Message, StateAuth } from "../types/types";
import { API_ENDPOINTS } from "../api/endpoints.js";


export const loginFetch = createAsyncThunk(
    'login/Fetch',
    async(userData: {password: string, email: string}) => {
        const {data} = await axios.post(API_ENDPOINTS.AUTH.LOGIN, userData)
    
        return data
    }
)

export const registerFetch = createAsyncThunk(
    'register/Fetch',
    async(user: {email: string, password: string, fullName: string, role: string}) => {
        console.log('wfqwfq')
        console.log(user)
        const {data} = await axios.post(API_ENDPOINTS.AUTH.REGISTER, user)

        return data
    }
)

export const meFetch = createAsyncThunk(
    'me/Fetch',
    async() => {
        const token = localStorage.getItem('JWTtoken')

        const {data} = await axios.get(API_ENDPOINTS.AUTH.GET_ME, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(data)
    
        return data
    }
)


export const getVkUser = createAsyncThunk('user/vk', async (user: {token: string, vkID: string, email: string | null}) => {
        console.log("data >>> ", user)
        const {data} = await axios.post('https://sfu-4bm4.onrender.com/vk/user', user)

        console.log(data)

        return data
    }
)

export const loginVk = createAsyncThunk('login/vk', async(vkid: string) => {
    const {data} = await axios.post('https://sfu-4bm4.onrender.com/vk/login', {vkid: vkid})

    return data
})

type MicrosoftType = {
    role: 'Студент' | 'Абитуриент', 
    email: string,
    fullName: string
}


export const registerMicrosoft = createAsyncThunk('register/microsoft', async(dataUser: MicrosoftType) => {
    const {data} = await axios.post("https://sfu-4bm4.onrender.com/microsoft/register", dataUser)

    return data
})


type DataMicrosoft = {
    email: string
}

export const loginMicrosoft = createAsyncThunk('login/microsoft', async(dataMicrosoft: DataMicrosoft) => {
    const {data} = await axios.post('https://sfu-4bm4.onrender.com/microsoft/login', dataMicrosoft)

    return data
})


export const changeAvatar = createAsyncThunk('change/avatar', async (dataAvatar: {id: string, avatar: string}) => {

    const {data} = await axios.post(API_ENDPOINTS.AUTH.CHANGE_AVATAR, dataAvatar)

    return data
})

export const sendAvatar = createAsyncThunk( 'avatar/fetch', async (formData: object) => {
    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.UPLOAD, formData)

    console.log(formData)

    return data
})

export const changeBackground = createAsyncThunk('changeBackground/fecth', async(backData: {id: string, backgroundProfile: string}) => {
    const {data} = await axios.post(API_ENDPOINTS.AUTH.CHANGE_BACKGROUND, backData)

    console.log(data)
    
    return data
})

export const sendBackground = createAsyncThunk('background/fetch', async(formData: object) => {
    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.UPLOAD, formData)

    return data
})

export const getUser = createAsyncThunk('getUser/fetch', async (id: string) => {
    console.log(id)
    const {data} = await axios.get(`${API_ENDPOINTS.AUTH.GET_USER}/${id}`)

    return data
})

export const changeTextFun = createAsyncThunk('text/fetch', async (textData: {userID: string, text: string}) => {
    console.log(textData)
    const {data} = await axios.post(API_ENDPOINTS.AUTH.CHANGE_TEXT, textData)

    return data
})

type ComplaintSubmit = {
    userID: string,
    autherID: string,
    text: string
}

export const createComplaint = createAsyncThunk('create/complaint', async(dataComplaint: ComplaintSubmit) => {
    const {data} = await axios.post(API_ENDPOINTS.AUTH.COMPLAINT_CREATE, dataComplaint)

    return data
})

type MessageSubmit = {
    text: string,
    userID: string,
    status: 'user' | 'admin',
    fullName: string
}

export const sendMessage = createAsyncThunk('send/message', async (message: MessageSubmit) => {
        
    const {data} = await axios.post(API_ENDPOINTS.AUTH.SEND_MESSAGE, message)

    return data 

})

type propsChat = {
    chat: Message[], 
    userID: string
}

export const changeLastChat = createAsyncThunk('change/lastChat', async (dataMessages: propsChat) => {
    const {data} = await axios.post(API_ENDPOINTS.AUTH.CHANGE_LAST_CHAT, dataMessages)

    return data
})


const initialState: StateAuth = {
    state: {},
    status: 'none',
    user: {
        value: {},
        status: 'loading'
    },
    vkAuth: {
        status: 'none'
    },
    userAvatar: {
        status: 'loading',
        img: {
            status: 'none',
            value: null
        }
    },
    userBackground: {
        status: 'none',
        img: {
            status: 'none',
            value: null
        }
    },
    subscribe: {
        status: 'none'
    },
    complaintStatus: 'none'
}


const authSlice = createSlice({
    name: 'auth/Slice',
    initialState,
    reducers: {
        logout: (state) => {
            state.state = {} 
        },
        resetUser: (state) => {
            state.user.value = []
            state.status = 'loading'
        },
        sendMessageChat: (state, action) => {
            console.log(action.payload)
            if('chat' in state.state){
                state.state.chat = action.payload.chat
            }         
        },
        banUser: (state, action) => {
            state.state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginFetch.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(loginFetch.fulfilled, (state, action) => {
            console.log(action.payload)
            state.status = 'success'
            state.state = action.payload
        })
        .addCase(loginFetch.rejected, (state) => {
            state.status = 'errors'
        })
        .addCase(meFetch.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(meFetch.fulfilled, (state, action) => {
            state.status = 'success'
            state.state = action.payload
        })
        .addCase(meFetch.rejected, (state) => {
            state.status = 'errors'
        })
        .addCase(registerFetch.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(registerFetch.fulfilled, (state, action) => {
            state.status = 'success'
            state.state = action.payload
        })
        .addCase(registerFetch.rejected, (state) => {
            state.status = 'errors'
        })
        .addCase(sendAvatar.pending, (state) => {
            state.userAvatar.img.status = 'loading'
        })    
        .addCase(sendAvatar.fulfilled, (state, action) => {
            console.log(action.payload)
            state.userAvatar.img.status = 'success'
            state.userAvatar.img.value = action.payload.path


            if('avatarUrl' in state.state){
                state.state.avatarUrl = action.payload.path
            }
            
        })   
        .addCase(sendAvatar.rejected, (state) => {
            state.userAvatar.img.status = 'errors'
        }) 
        .addCase(changeAvatar.fulfilled, (state, action) => {
            console.log('USER', action.payload)
            state.state = action.payload
            state.user.value = action.payload
        })   
        .addCase(sendBackground.pending, (state) => {
            console.log('payload', 'test')
            state.userBackground.img.status = 'loading'
            state.userBackground.img.value = null
        })
        .addCase(sendBackground.fulfilled, (state, action) => {
            state.userBackground.img.status = 'success'
            state.userBackground.img.value = action.payload.path

            if('backgroundProfile' in state.state){
                state.state.backgroundProfile = action.payload.path
            }

        })
        .addCase(sendBackground.rejected, (state, action) => {
            console.log('payload', action.payload)
            state.userBackground.img.status = 'errors'
        })
        .addCase(changeBackground.fulfilled, (state, action) => {
            console.log('payload', action.payload)

            if('backgroundProfile' in state.state && 'backgroundProfile' in state.user.value) {
                state.state.backgroundProfile = action.payload.backgroundProfile
                state.user.value.backgroundProfile = action.payload.backgroundProfile
            }
        })
        .addCase(getUser.fulfilled, (state, action) => {
            console.log(action.payload)

            state.user.value = action.payload
        })
        .addCase(changeTextFun.fulfilled, (state, action) => {
            if('text' in state.user.value){
                state.user.value.text = action.payload.text
            }
        })
        .addCase(createComplaint.pending, (state, action) => {
            state.complaintStatus = 'loading'
        })
        .addCase(createComplaint.fulfilled, (state, action) => {
            state.user.value = action.payload
            state.complaintStatus = 'success'
        })
        .addCase(changeLastChat.fulfilled, (state, action) => {
            state.state = action.payload
        })
        .addCase(getVkUser.pending, (state) => {
            state.vkAuth.status = 'loading'
        })
        .addCase(getVkUser.fulfilled, (state, action) => {
            state.vkAuth.status = 'success'

            console.log(action.payload)
            state.state = action.payload
        })
        .addCase(getVkUser.rejected, (state) => {
            state.vkAuth.status = 'errors'
        })
        .addCase(loginVk.fulfilled, (state, action) => {
            state.state = action.payload
        })
        .addCase(registerMicrosoft.fulfilled, (state, action) => {
            state.state = action.payload
        })
        .addCase(loginMicrosoft.fulfilled, (state, action) => {
            state.state = action.payload
        })
    }
})


export const {logout, resetUser, sendMessageChat, banUser}  = authSlice.actions
export const authReducer = authSlice.reducer
