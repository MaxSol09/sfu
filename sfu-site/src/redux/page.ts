
import { createSlice } from "@reduxjs/toolkit";

interface State {
    page: string,
    support: boolean
}

const initialState: State = {
    page: 'home', 
    support: false
}


const themeSlice = createSlice({
    name: 'page-slice',
    initialState,
    reducers: {
        changePage: (state, action) => {
            console.log(action)

            switch(action.payload.type){
                case 'HOME': 
                    state.page = 'home'
                    break;
                case 'ABOUT': 
                    state.page = 'about'
                    break;
                case 'THEMES': 
                    state.page = 'themes'
                    break;
            }
        },
        changeSupport: (state, action) => {
            state.support = !action.payload.type
        }
    }
})

export const pageReducer = themeSlice.reducer
export const {changePage, changeSupport} = themeSlice.actions