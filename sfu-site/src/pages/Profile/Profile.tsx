import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { Header } from '../../components/Header/Header'
import { isSendBan, isUser } from '../../utils/checkValue'
import { Skeleton } from 'antd'
import { Achievements } from '../../components/Panels/Achievements/Achievements'
import { Skeleton as SkeletonText} from '@mui/joy'
import { Tags } from '../../components/Panels/Tags/Tags'
import {Chat} from '../../components/Chat/Chat'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SkeletonBlock } from '../../components/SkeletonBlock'
import { NotificationComplaint } from '../../components/Notifications/NotificationComplaint'
import { EditUser } from '../../pages/Profile/EditUser/EditUser'
import { Variants } from './Variants'
import { useGetUser } from '../../hooks/useGetUser'
import { BackgroundProfile } from './BackgroundProfile'
import { Ban } from './Ban'
import { AvatarProfile } from './AvatarProfile'

const MemoHeader = React.memo(Header)

export const Profile: React.FC = () => {
  
  const {id} = useParams()

  const state = useAppSelector(el => el.auth.state)
  const user = useGetUser(id as string)

  return (
    <>
      <MemoHeader currPage={'home'}/>
      <aside className='grid fixed left-[100px] top-[110px] py-[20px] gap-[20px] w-[250px] max-[1300px]:hidden'>
        {isUser(user) ? user.role === 'Студент' ? <Achievements /> : <Tags /> : <SkeletonBlock />}
      </aside>
      <main className='pt-[130px] pl-[35px] ml-[25%] mr-[100px] max-[1300px]:w-full max-[1300px]:ml-[0%] max-[1300px]:px-[8%]'>
        {isUser(state) && isUser(user) ?      
          <div className='w-full h-[200px] bg-gray-200 relative'>
            <BackgroundProfile />
            {!isSendBan(user, state._id) && <Ban />}
            <div className='absolute left-[30px] bottom-[-50px] flex items-end'>
              <div className='flex pl-[5px] flex-col items-center'>
                <AvatarProfile />
                <p className='text-[18px]'>{user.fullName}</p>  
              </div>
            </div>
            <EditUser />
            <Variants />
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
          <Chat />
          <NotificationComplaint />
      </main>
    </>
  )
}
