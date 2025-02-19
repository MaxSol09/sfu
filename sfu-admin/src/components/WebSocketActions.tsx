import { useEffect } from "react"
import { useUserStore } from "../zustand/auth"
import { useQuestionsStore } from "../zustand/questions"

export const WebSocketActions = () => {

    const {sendMessage, banUser, deleteUser, addUser} = useUserStore(el => el)
    const {deleteQuestion, moderationQuestion, addModerationQuestion} = useQuestionsStore(el => el)

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/?role=admin`)

        ws.onmessage = e => {

            const userdata = JSON.parse(e.data)


            switch(userdata.type){
                case 'chat':
                    sendMessage(userdata.data)
                    break
                case 'moderationQuestion': 
                    moderationQuestion(userdata.data)
                    break
                case 'deleteQuestion':
                    deleteQuestion(userdata.data._id)
                    break
                case 'createQuestion': 
                    addModerationQuestion(userdata.data)
                    break                    
                case 'ban':
                    banUser(userdata.data)
                    break
                case 'moderationQuestion': 
                    moderationQuestion(userdata.data)
                    break
                case 'deleteUser': 
                    deleteUser(userdata.data._id)
                    break
                case 'registerUser': 
                    addUser(userdata.data)
                    break
                case 'createComplaint': 
                    console.log(userdata.data)
                    break
                default: 
                    break
            }

        }

    }, [])



    return null
}