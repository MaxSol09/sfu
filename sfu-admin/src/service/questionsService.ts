import axios from "axios"
import { API_ENDPOINTS_REAL } from "../api/endpoints"

interface DataModeration {
    moderation: boolean,
    postId: string,
    url: string
}

class QuestionsService {

    getQuestions(){
        const data = axios.get(API_ENDPOINTS_REAL.QUESTIONS.GET_QUESTIONS)

        return data
    }

    getQuestion(id: string){
        const data = axios.get(`https://sfu-server-yx7u.onrender.com/question/${id}`)

        return data
    }

    moderationQuestion(dataModeration: DataModeration){
        const data = axios.post(API_ENDPOINTS_REAL.QUESTIONS.MODERATION_QUESTION, dataModeration)

        return data
    }

    deleteQuestion(id: string){
        const data = axios.post(API_ENDPOINTS_REAL.QUESTIONS.DELETE_QUESTION, {id})

        return data
    }

}

export const questionsService = new QuestionsService()