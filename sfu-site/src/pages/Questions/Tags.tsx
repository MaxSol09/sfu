import React from 'react'
import { useAppSelector } from '../../redux/hooks'

export const Tags: React.FC = () => {

    const tags = useAppSelector(el => el.questions.tags.items)

    return (
        <div className={`flex pb-[15px] flex-wrap items-end min-[1130px]:hidden max-[500px]:items-center gap-[15px] gap-y-0`}>
            <h1 className='text-[21px] max-[400px]:text-[19px]'>Популярные темы:</h1>
            {tags.length ? tags.map(tag => (
                <div className=' text-gray-500 text-[20px] max-[680px]:text-[19px]' key={tag.id}>{'#' +  tag.tag}</div>
            )) : 'отсутствуют'}
        </div>
    )
}
