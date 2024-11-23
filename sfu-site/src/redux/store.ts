import {configureStore} from '@reduxjs/toolkit'
import { pageReducer } from './page.ts'
import { authReducer } from './auth.ts'



const store = configureStore({
    reducer: {
        page: pageReducer,
        auth: authReducer
    }, 
    devTools: true
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispacth = typeof store.dispatch

export default store