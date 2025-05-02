import React from 'react'
import { useAppSelector } from '../../redux/hooks'

export const Tags = () => {

    const tags = useAppSelector(el => el.questions.tags.items)

    return (
        <div className='flex items-center pb-[10px] flex-wrap'>
            <h1 className='text-[21px]'>Популярные темы:</h1>
            {tags.length ? tags.map(tag => (
                <div className='px-[5px] py-[3px] rounded-[3px] mx-[10px]' key={tag.id}>{'#' +  tag.tag}</div>
            )) : 'отсутствуют'}
        </div>
    )
}
