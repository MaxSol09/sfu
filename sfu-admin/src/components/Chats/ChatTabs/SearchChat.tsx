import Search from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../zustand/auth'

export const SearchChat: React.FC = () => {

    const [name, setName] = useState<string>('')

    const findUserMessages = useUserStore(el => el.findUserMessages)

    useEffect(() => {
        setTimeout(() => {
            findUserMessages(name)
        }, 300)
    }, [name])

    return (
        <div className='flex justify-center pt-[10px]'>
            <Search onChange={e => setName(e.target.value)} className='w-3/4' placeholder='поиск пользователя' />
        </div>
    )
}
