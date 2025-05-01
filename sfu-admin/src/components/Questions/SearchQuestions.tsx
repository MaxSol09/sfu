import Search from 'antd/es/input/Search'
import React from 'react'
import { useFindQuestion } from '../../hooks/hooks'

type Props = {
    isModerationQuestions: boolean
}

export const SearchQuestions: React.FC<Props> = ({isModerationQuestions}) => {

    const {setTitle} = useFindQuestion(isModerationQuestions)

    return (
        <Search onChange={e => setTitle(e.target.value)} className='w-1/2' placeholder="поиск по почте или имени" enterButton />
    )
}
