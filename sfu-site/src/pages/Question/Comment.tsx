import React from 'react'
import { Link } from 'react-router-dom'
import { TypeComment } from '../../types/types'
import User from '../../images/user.jpg'
import { isUser } from '../../utils/checkValue'
import { useAppSelector } from '../../redux/hooks'

type Props = {
  comment: TypeComment, 
}

export const Comment: React.FC<Props> = ({comment}) => {
    return (
      <div className="mt-2 px-4 break-words realtive w-3/4 max-[800px]:w-full flex items-start">
        <img className='w-[60px] h-[60px] rounded-full' src={comment.user === null ? User : comment.user.avatarUrl ? comment.user.avatarUrl : User} alt="аватарка пользователя" />
        <div className='pl-[10px]'>
          <p className='text-[23px]'>{comment.user ? comment.user.fullName : 'Удаленный аккаунт'}</p>
          <p className="leading-none text-black text-[22px]">{comment.text}</p>
        </div>
      </div>
    )
}
