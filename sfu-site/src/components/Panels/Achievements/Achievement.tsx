import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { isUser } from '../../../utils/checkValue'

type TypeProps = {
    a: {
        count: number,
        id: number,
        title: string
    }
}

export const Achievement: React.FC<TypeProps> = ({a}) => {

    const user = useAppSelector(el => el.auth.user.value)

    return (
        <>
            {isUser(user) && <div title={a.title} key={a.id} className='w-[80px] h-[80px] bg-white flex items-center justify-center' style={{background:  user.answer >= a.count ? 'white' : 'rgba(0, 0, 0, 0.1)'}}>
                <div className='w-[50px] h-[50px] text-[18px] flex items-center justify-center text-gray-100 bg-red-400 rounded-full'>
                    {a.count}
                </div>
            </div>}
        </>
    )
}
