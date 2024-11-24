import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loginFetch = createAsyncThunk(
    'login/Fetch',
    async(userData: {password: string, email: string}) => {
        const {data} = await axios.post('http://localhost:4444/auth/login', userData)
    
        return data
    }
)

export const registerFetch = createAsyncThunk(
    'register/Fetch',
    async(user: {email: string, password: string, fullName: string, role: string}) => {
        const {data} = await axios.post('http://localhost:4444/auth/register', user)

        console.log(user)

        return data
    }
)

export const meFetch = createAsyncThunk(
    'me/Fetch',
    async() => {
        const token = localStorage.getItem('JWTtoken')

        const {data} = await axios.get('http://localhost:4444/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
        return data
    }
)


export const changeAvatar = createAsyncThunk('change/avatar', async (dataAvatar: {id: string, avatar: string}) => {
    const {data} = await axios.post('http://localhost:4444/user/img', dataAvatar)

    return data
})

export const sendAvatar = createAsyncThunk( 'avatar/fetch', async (formData: object) => {
    const {data} = await axios.post('http://localhost:4444/upload', formData)

    return data
})

export const changeBackground = createAsyncThunk('changeBackground/fecth', async(backData: {id: string, backgroundProfile: string}) => {
    const {data} = await axios.post('http://localhost:4444/user/backgroundProfile', backData)

    console.log(data)
    
    return data
})

export const getUser = createAsyncThunk('getUser/fetch', async (userData: {id: string}) => {
    console.log(userData)
    const {data} = await axios.get(`http://localhost:4444/user/${userData.id}`)

    return data
})

type Message = {
    text: string,
    fullName: string, 
    userID?: string,
    avatar?: string,
    status: string
}

export type UserData = {
    avatarUrl?: string,
    backgroundProfile?: string,
    fullName: string,
    countSubs: number,
    createdAt: string,
    email: string,
    text: string,
    updatedAt: string,
    __v: number,
    _id: string,
    token: string,
    chat: Message[]
}

type State = {
    state: UserData | {},
    status: 'loading' | 'success' | 'errors',
    user: {
        value: UserData | {},
        status: 'loading' | 'success' | 'errors'
    },
    userAvatar: {
        status: 'loading' | 'success' | 'errors',
        img: {
            status: 'loading' | 'success' | 'errors',
            value: string | null 
        }
    }
    userBackground: {
        status: 'loading' | 'success' | 'errors',
        img: {
            status: 'loading' | 'success' | 'errors',
            value: string | null
        }
    },
    subscribe: {
        status: 'none' | 'success'
    }
}

const initialState: State = {
    state: {},
    status: 'loading',
    user: {
        value: [],
        status: 'loading'
    },
    userAvatar: {
        status: 'loading',
        img: {
            status: 'loading',
            value: null
        }
    },
    userBackground: {
        status: 'loading',
        img: {
            status: 'loading',
            value: null
        }
    },
    subscribe: {
        status: 'none'
    }
}


const authSlice = createSlice({
    name: 'auth/Slice',
    initialState,
    reducers: {
        logout: (state) => {
            state.state = {} 
        },
        resetUser: (state) => {
            state.userBackground.img.value = null
            state.userBackground.img.status = 'loading'
            state.userBackground.status = 'loading'
            state.userAvatar.img.value = null
            state.userAvatar.img.status = 'loading'
            state.userAvatar.status = 'loading'
            state.user.value = []
            state.user.status = 'loading'
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
    }
})


export const {logout, resetUser }  = authSlice.actions
export const authReducer = authSlice.reducer
