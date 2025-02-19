import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import { Skeleton as SkeletonText} from '@mui/joy'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuestionsStore } from '../../zustand/questions'
import { useUserStore } from '../../zustand/auth'
import { isUser } from '../../utils/checkValue'
import { useMutation, useQuery } from 'react-query'
import { usersService } from '../../service/usersService'
import { questionsService } from '../../service/questionsService'
import { Card, CardHeader, IconButton } from '@mui/material'
import { Avatar } from './Avatar'
import { Background } from './Background'
import { Posts } from '../Posts/Posts';
import { EditUser } from './EditUser/EditUser';

export const Profile: React.FC = () => {
  
  const {id} = useParams()
  const myQuestions = useQuestionsStore(el => el.myQuestions.items)
  const myFavorite = useQuestionsStore(el => el.favorite)
  const myAnswers = useQuestionsStore(el => el.myAnswer.value)
  const user = useUserStore(el => el.user.value)

  const getUserFn = useUserStore(el => el.getUser)

  const {resetUser, changeStudentSpeciality} = useUserStore(el => el)
  const {getMyAnswer, getMyFavorite, getMyQuestions, getAllQuestions} = useQuestionsStore(el => el)

  useEffect(() => {
    resetUser()
  }, [])

  console.log(user)

  const questionsData = useQuery({
    queryKey: ['questionsKEY'],
    queryFn: questionsService.getQuestions,
    select: data => data.data
  })
  
  useEffect(() => {
    if(questionsData.isSuccess){
      getAllQuestions(questionsData.data)
    }
  }, [questionsData.isSuccess])
  

  const getUser = useQuery({
    queryFn: () => usersService.getUser(id as string),
    queryKey: ['getUser', id],
    select: (data) => data.data
  })

  const mutateSpeciality = useMutation(usersService.changeUserSpeciality, {
    mutationKey: ['changeSpeciality', id]
  })

  useEffect(() => {
    if(mutateSpeciality.isSuccess){
      changeStudentSpeciality(mutateSpeciality.data.data.speciality)
    }
  }, [mutateSpeciality.isSuccess])

  const [variant, setVariant] = useState<boolean>(false)


  useEffect(() => {
    if(getUser.isSuccess){
      getUserFn(getUser.data)
    }
  }, [getUser.isSuccess])


  useEffect(() => {
    if(questionsData.isSuccess && isUser(user)){
      getMyFavorite(user._id)
      if(user.role === 'Студент'){
        console.log(5)
        getMyAnswer(user._id)
      }
      else{
        getMyQuestions(user._id)
      }
    }
  }, [questionsData.isSuccess, user, id])

  const textRef = useRef<HTMLParagraphElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth)
  }
  }, [user])

  const isTextLessThan140 = textWidth < 140;

  return (
    <>
      <main className='pt-[40px] px-[100px] overflow-x-auto h-[100vh] max-[1050px]:px-[50px]'>
      { isUser(user) ?      
        <div className='w-full h-[200px] bg-gray-200 relative'>
            <Background />
            <div className='absolute left-[30px] bottom-[-50px] flex items-end'>
              <div className={`flex pl-[5px] flex-col ${isTextLessThan140 ? 'items-center' : 'items-start'}`}>
                <Avatar loadingQuestions={questionsData.isLoading}/>
                <p ref={textRef} className='text-[18px] max-[1050px]:w-[text-[16px]'>{user.fullName}</p>  
              </div>
            </div>
            <EditUser />
            <div className='text-[18px] pt-[20px] text-slate-800 flex justify-center gap-[30px] cursor-pointer'>
              <p onClick={() => setVariant(false)} className={`px-[5px] ${!variant && 'underline'}`} style={{transition: 'all 0.2s'}}>{user.role === 'Студент' ? 'Ответы' : 'Вопросы'}</p>
              <p onClick={() => setVariant(true)} className={`px-[5px] ${variant && 'underline'}`} style={{transition: 'all 0.2s'}}>Понравившиеся</p>
            </div>
            <Posts loadingQuestions={questionsData.isSuccess} questions={!variant ? isUser(user) && user.role === 'Студент' ? myAnswers : myQuestions : myFavorite} />
          </div> : 
          <Card sx={{ width: '100%' }}>
          <CardHeader
            avatar={
              <SkeletonText animation="wave" variant="circular" width={80} height={80} />
            }
            action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
            }
            title={
              <Skeleton style={{width: '400px'}} title={false} paragraph={{rows: 2}}></Skeleton>
            }
          />
          <SkeletonText sx={{ height: 300 }} animation="wave" variant="rectangular" />
        </Card>
          }
      </main>
    </>
  )
}
