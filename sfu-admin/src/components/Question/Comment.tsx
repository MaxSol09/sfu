import React from 'react'
import { Link } from 'react-router-dom'
import { TypeComment } from '../../types/types'
import User from '../../images/user.jpg';

type Props = {
    comment: TypeComment
}

export const Comment: React.FC<Props> = ({comment}) => {
  return (
    <div className="py-2 px-4 break-words realtive shadow-custom-rounded w-3/4">
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
            <img className='w-[35px] h-[35px] rounded-full mr-1 object-cover' src={comment.user === null ? User : comment.user.avatarUrl ? comment.user.avatarUrl : User} alt='User'/>
            <Link to={`/profile/${comment.user !== null ? comment.user._id : 'удалённый пользователь '}`} className='text-gray-500'>
                {comment.user !== null ? comment.user.fullName : 'пользователь удалён'}
            </Link>
            </div>            
        </div>
        <p className="leading-none pt-[5px] py-3'text-black">{comment.text}</p>
    </div>
  )
}
