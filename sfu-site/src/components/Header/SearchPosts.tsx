import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { searchQuestion } from '../../redux/questions'

export const SearchPosts: React.FC = () => {

    const dispatch = useAppDispatch()

    const findPost = (e: string) => {
        if(!e) return 
    
        setTimeout(() => {
            dispatch(searchQuestion({title: e}))
        }, 300)
    }

    return (
        <input onChange={e => findPost(e.target.value)} className='text-[20px] outline-gray-400 border-[2px] w-[400px] py-[5px] px-[10px]' placeholder='поиск по теме или названию' type="text" />
    )
}
