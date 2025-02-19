import { Button } from 'antd'
import React from 'react'
import { useUserStore } from '../../zustand/auth'

export const FilterUsers: React.FC = () => {

    const usersArr = useUserStore(el => el.usersArr)
    
    const {getUsers, getStudents, getOldUsers, getApplicants, getBanUsers, getNotBanUsers} = useUserStore(el => el)

    return (
        <div className='pt-[20px] flex gap-[20px] justify-end flex-wrap'>
            <Button onClick={() => getStudents()}>Студенты</Button>
            <Button onClick={() => getApplicants()}>Абитуриенты</Button>
            <Button onClick={() => getBanUsers()}>Заблокированные</Button>
            <Button onClick={() => getNotBanUsers()}>Не заблокированные</Button>
            <Button onClick={() => getOldUsers()}>Старые</Button>
            <Button onClick={() => getUsers(usersArr)}>Новые</Button>
            <Button onClick={() => getUsers(usersArr)}>Все</Button>
        </div>
    )
}
