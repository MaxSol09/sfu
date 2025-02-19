import axios from "axios"
import { API_ENDPOINTS } from "../api/endpoints"

interface DataModeration {
    moderation: boolean,
    postId: string
}

class QuestionsService {

    getQuestions(){
        const data = axios.get(API_ENDPOINTS.QUESTIONS.GET_QUESTIONS)

        return data
    }

    getQuestion(id: string){
        const data = axios.get(`http://localhost:4444/question/${id}`)

        return data
    }

    moderationQuestion(dataModeration: DataModeration){
        const data = axios.post(API_ENDPOINTS.QUESTIONS.MODERATION_QUESTION, dataModeration)

        return data
    }

    deleteQuestion(id: string){
        const data = axios.post(API_ENDPOINTS.QUESTIONS.DELETE_QUESTION, {id})

        return data
    }

}

export const questionsService = new QuestionsService()