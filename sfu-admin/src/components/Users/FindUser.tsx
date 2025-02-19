import Search from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../zustand/auth'

export const FindUser: React.FC = () => {

    const {findUser} = useUserStore(el => el)

    const [name, setName] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            if(name){
                findUser(name)
            }
        }, 300)
    }, [name])

    return (
        <Search onChange={e => setName(e.target.value)} className='w-1/2' placeholder="поиск по почте или имени" enterButton />
    )
}
