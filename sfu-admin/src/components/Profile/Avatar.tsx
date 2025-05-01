import React, { useRef, useState } from 'react'
import { Skeleton as SkeletAvatar } from '@mui/joy'; 
import User from '../../images/user.jpg'
import { isUser } from '../../utils/checkValue';
import { useParams } from 'react-router-dom';
import { DeleteAvatar } from '../Modals/DeleteAvatar';
import Delete from '../../images/delete.png'
import { useAvatar } from '../../hooks/hooks';

type Props = {
    loadingQuestions: boolean
}

export const Avatar: React.FC<Props> = ({loadingQuestions}) => {

  const {id} = useParams() 

  const [showButton, setShowButton] = useState<boolean>(false);
  const ref = useRef<null | HTMLInputElement>(null)
  const [modalDeleteAvatar, setModalDeleteAvatar] = useState<boolean>(false)

  const {user, changeAvatar, sendLoading, changeLoading} = useAvatar(id as string)

  return (
    <>
        {loadingQuestions ? <SkeletAvatar variant="circular" width={130} height={130}/> 
            : isUser(user) && <div className='relative bg-white rounded-full'>
                {sendLoading || changeLoading ? <SkeletAvatar variant="circular" width={130} height={130}/> : 
                    <img src={user.avatarUrl ? user.avatarUrl : User} alt="avatar" 
                      className='rounded-full w-[130px] h-[130px] object-cover border-gray-300 border-[3px] max-[1050px]:w-[100px] max-[1050px]:h-[100px]' 
                      onMouseOver={() => setShowButton(true)}
                      onMouseOut={() => setShowButton(false)}
                    />
                }
              <button
                  onClick={() => ref.current?.click()}
                  className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[15px] whitespace-nowrap'
                  style={{ display: showButton ? 'block' : 'none' }}
                  onMouseOver={() => setShowButton(true)}
                  onMouseOut={() => setShowButton(false)}
              >
                Смена аватарки
            </button>
            <button onClick={() => setModalDeleteAvatar(true)} 
                className={`absolute bottom-[2px] right-[2px] bg-white p-[2px] shadow-xl rounded-[5px] z-50 ${user.avatarUrl ? 'flex' : 'hidden'}`}>
                <img className='w-[25px]' alt='image-delete' src={Delete}></img>
            </button>
        </div>}
        <input onChange={e => changeAvatar(e)} ref={ref} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
        <DeleteAvatar modal={modalDeleteAvatar} setModal={setModalDeleteAvatar}/>
    </>
  )
}
