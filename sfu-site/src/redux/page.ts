
import { createSlice } from "@reduxjs/toolkit";

interface State {
    page: string,
    form: boolean,
    support: boolean,
    commentForm: {
        type: boolean,
        id: string
    }
}

const initialState: State = {
    page: 'home', 
    form: false,
    support: false,
    commentForm: {
        type: false,
        id: ''
    }
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
        changeOpenFormCreate: (state) => {
            state.form = !state.form
        },
        changeSupport: (state, action) => {
            state.support = !action.payload.type
        },
        changeCommentForm: (state, action) => {
            console.log(action.payload)
            state.commentForm.id = action.payload.id
            state.commentForm.type = !state.commentForm.type
            
        }
    }
})

export const pageReducer = themeSlice.reducer
export const {changePage, changeSupport, changeCommentForm, changeOpenFormCreate} = themeSlice.actions