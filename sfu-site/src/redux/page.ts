import { createSlice } from "@reduxjs/toolkit";
import { StatePage } from "../types/types";


const initialState: StatePage = {
    page: 'home', 
    form: false, // котролируем открытие формы для создания вопроса
    support: false, // контролируем открытие поддержки 
    questionOpen: {
        open: false, // если зайти на вопрос, после переключится на вкладку о нас, а потом вернутся нажать на вкладку вопросы, нас вернёт на вопрос
        link: '' // сохраняем ссылку вопроса, если переходим на вкалдку о нас
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
                    state.form = false //при нажатии на вкладку вопросы форма для создания вопроса должна быть закрытой, то есть false

                    state.questionOpen.open = false //делаем так, чтобы вопрос был закрыт, если мы на вкладку вопросы и не заходили на вопрос
                    state.questionOpen.link = '' // очищаем ссылку вопроса на который мы заходили

                    break;
                case 'ABOUT': 
                    state.page = 'about'
                    state.form = false

                    console.log('weg')

                    if(action.payload.link){
                        state.questionOpen.open = true
                        state.questionOpen.link = action.payload.link
                    }

                    break;
                case 'THEMES': 
                    state.page = 'themes'
                    break;
                case 'FORM_CREATE': {
                    state.form = true
                }
            }
        },
        changeSupport: (state, action) => {
            state.support = !action.payload.type
        }
    }
})

export const pageReducer = themeSlice.reducer
export const {changePage, changeSupport } = themeSlice.actions