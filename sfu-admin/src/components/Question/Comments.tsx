import React from 'react';
import { TypeComment } from '../../types/types';
import { Comment } from './Comment';



type propsType = {
  comments: TypeComment[]
}

export const Comments: React.FC<propsType> = ({comments}) => {


  return (
    <div className='py-[20px] text-2xl space-y-[20px] pb-[100px] w-2/3'>
      <h1 className='text-[21px]'>Комментарии:</h1>
      {comments.length > 0 ? comments.map((comment) => {
          return (
            <Comment key={comment.commentId} comment={comment}/>
        )}).reverse() : <p className='text-[18px]'>отсутствуют</p>
      }
    </div>
  )
}
