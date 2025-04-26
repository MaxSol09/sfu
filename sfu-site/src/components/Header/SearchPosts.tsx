import React, { useState } from 'react'
import { useFindQuestion } from '../../hooks/useFindQuestion'


export const SearchPosts: React.FC = () => {

    const [inputValue, setInputValue] = useState<string>('')

    useFindQuestion(inputValue)

    return (
        <input onChange={e => setInputValue(e.target.value)} className='text-[20px] max-[640px]:text-[16px] outline-gray-400 border-[2px] w-[400px] py-[5px] px-[10px]' placeholder='поиск по теме или названию' type="text" />
    )
}
