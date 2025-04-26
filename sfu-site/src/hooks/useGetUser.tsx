import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getUser, resetUser } from '../redux/auth'
import { isUser } from '../utils/checkValue'
import { getMyAnswer, getMyFavorite, getMyModerationQuestions, getMyQuestions } from '../redux/questions'

export const useGetUser = (id: string) => {

  const statusQuestions = useAppSelector(el => el.questions.questions.status)
  const user = useAppSelector(el => el.auth.user.value)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetUser())

    if(id){
      dispatch(getUser(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if(statusQuestions === 'success' && isUser(user)){
      dispatch(getMyFavorite({id}))
      if(user.role === 'Студент'){
        dispatch(getMyAnswer({id}))
      }
      else{
        dispatch(getMyQuestions({id}))
        dispatch(getMyModerationQuestions({id}))
      }
    }
  }, [statusQuestions, dispatch, user, id])

  return user
}
