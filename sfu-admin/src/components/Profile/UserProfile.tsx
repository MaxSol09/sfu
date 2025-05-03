import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { Skeleton as SkeletonText} from '@mui/joy'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuestionsStore } from '../../zustand/questions'
import { useUserStore } from '../../zustand/auth'
import { isUser } from '../../utils/checkValue'
import { Card, CardHeader, IconButton } from '@mui/material'
import { Avatar } from './Avatar'
import { Background } from './Background'
import { Posts } from '../Posts/Posts';
import { EditUser } from './EditUser/EditUser';
import { useUserProfile, useTextSize, useChangeSpeciality, useGetUser } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';

export const UserProfile: React.FC = () => {

  const {id} = useParams()

  useEffect(() => {
    resetUser()
  }, [])

  useChangeSpeciality(id as string)
  const getUser = useGetUser(id as string)

  console.log(getUser)

  const {user, isLoading, isSuccess} = useUserProfile(id as string)

  const myQuestions = useQuestionsStore(el => el.myQuestions.items)
  const myFavorite = useQuestionsStore(el => el.favorite)
  const myAnswers = useQuestionsStore(el => el.myAnswer.value)

  const {resetUser} = useUserStore(el => el)

  console.log(user)

  const [variant, setVariant] = useState<boolean>(false)

  const {textRef, isTextLessThan140} = useTextSize(user)

  return (
    <>
      <main className='pt-[40px] px-[100px] overflow-x-auto h-[100vh] max-[1050px]:px-[50px]'>
      { isUser(user) ?      
        <div className='w-full h-[200px] bg-gray-200 relative'>
            <Background />
            <div className='absolute left-[30px] bottom-[-50px] flex items-end'>
              <div className={`flex pl-[5px] flex-col ${isTextLessThan140 ? 'items-center' : 'items-start'}`}>
                <Avatar loadingQuestions={isLoading}/>
                <p ref={textRef} className='text-[18px] max-[1050px]:w-[text-[16px]'>{user.fullName}</p>  
              </div>
            </div>
            <EditUser />
            <div className='text-[18px] pt-[20px] text-slate-800 flex justify-center gap-[30px] cursor-pointer'>
              <p onClick={() => setVariant(false)} className={`px-[5px] ${!variant && 'underline'}`} style={{transition: 'all 0.2s'}}>{user.role === 'Студент' ? 'Ответы' : 'Вопросы'}</p>
              <p onClick={() => setVariant(true)} className={`px-[5px] ${variant && 'underline'}`} style={{transition: 'all 0.2s'}}>Понравившиеся</p>
            </div>
            <Posts loadingQuestions={isSuccess} questions={!variant ? isUser(user) && user.role === 'Студент' ? myAnswers : myQuestions : myFavorite} />
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
