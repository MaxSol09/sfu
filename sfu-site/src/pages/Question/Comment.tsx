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
      <div className="mt-2 px-4 w-full flex items-start">
        <img className='w-[60px] h-[60px] rounded-full' src={comment.user === null ? User : comment.user.avatarUrl ? comment.user.avatarUrl : User} alt="аватарка пользователя" />
        <div className='pl-[10px] flex-1 w-3/4'>
          {isUser(comment.user) ? <Link to={`/profile/${comment.user._id}`} className='text-[23px] cursor-pointer'>
            {comment.user.fullName}
          </Link> : <p className='cursor-pointer text-[23px]'>Удаленный аккаунт</p>}
          <p className="leading-none text-black text-[22px] break-words overflow-hidden" style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>{comment.text}</p>
        </div>
      </div>
    )
}
