import React, { useEffect, useRef } from "react";
import { isUser } from "../utils/checkValue";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { banUser, logout, sendMessageChat } from "../redux/auth";
import { addQuestion, createCommentFn, deleteQuestionFn } from "../redux/questions";
import { useNavigate } from "react-router-dom";

export const WebSocketActions: React.FC = () => {

    const state = useAppSelector(el => el.auth.state)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (isUser(state)) {
            if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {

                ws.current = new WebSocket(`ws://localhost:8080?userId=${state._id}/?role=${state.role === 'Абитуриент' ? 'applicant' : 'student'}`)

                ws.current.onmessage = e => {
                    const userdata = JSON.parse(e.data)

                    switch (userdata.type) {
                        case 'chat':
                            dispatch(sendMessageChat(userdata.data))
                            break
                        case 'moderationQuestion':
                            dispatch(addQuestion(userdata.data))
                            break
                        case 'deleteQuestion':
                            dispatch(deleteQuestionFn(userdata.data))
                            break
                        case 'createComment':
                            dispatch(createCommentFn(userdata.data))
                            break
                        case 'ban':
                            dispatch(banUser(userdata.data))
                            break
                        case 'deleteUser':
                            dispatch(logout())
                            localStorage.removeItem('JWTtoken')
                            navigate('/')
                            window.location.reload()
                            break
                        default:
                            break
                    }
                };

                ws.current.onclose = () => {
                    console.log('WebSocket closed')
                }

                ws.current.onerror = error => {
                    console.error('WebSocket error:', error)
                }
            }
        }

        return () => {
            if (ws.current) {
                console.log("Closing WebSocket connection")
                ws.current.close()
                ws.current = null
            }
        };
    }, [state, dispatch, navigate])

    return null
}