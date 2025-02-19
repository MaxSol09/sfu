import Search from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import { useQuestionsStore } from '../../zustand/questions'

type Props = {
    moderationPosts: boolean
}

export const SearchQuestions: React.FC<Props> = ({moderationPosts}) => {

    const [title, setTitle] = useState<string>('')

    const searchQuestions = useQuestionsStore(el => el.searchQuestion)

    useEffect(() => {
        if(title.length){
            setTimeout(() => {
                searchQuestions(title, moderationPosts)
            }, 300)
        }
    }, [title])

    return (
        <Search onChange={e => setTitle(e.target.value)} className='w-1/2' placeholder="поиск по почте или имени" enterButton />
    )
}
