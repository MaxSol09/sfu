import {configureStore} from '@reduxjs/toolkit'
import { pageReducer } from './page'
import { authReducer } from './auth'
import { questionsReducer } from './questions'



const store = configureStore({
    reducer: {
        page: pageReducer,
        auth: authReducer,
        questions: questionsReducer
    }, 
    devTools: true
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispacth = typeof store.dispatch

export default store