import React, { useEffect, useState } from 'react'
import Edit from '../../../images/edit.svg'
import Back from '../../../images/back.svg'
import Check from '../../../images/check.svg'
import { useMutation } from 'react-query'
import { usersService } from '../../../service/usersService'
import { useUserStore } from '../../../zustand/auth'
import { isUser } from '../../../utils/checkValue'
import { useParams } from 'react-router-dom'

type Props = {
    changeText: boolean
}

export const EditSpeciality: React.FC<Props> = ({changeText}) => {

    const user = useUserStore(el => el.user.value)
    const {id} = useParams()

    const [changeSpeciality, setChangeSpeciality] = useState<boolean>(false)
    const [speciality, setSpeciality] = useState<string>('')

    const {changeStudentSpeciality} = useUserStore(el => el)

    const mutateSpeciality = useMutation(usersService.changeUserSpeciality, {
        mutationKey: ['changeSpeciality', id]
    })

    useEffect(() => {
        if(mutateSpeciality.isSuccess){
            changeStudentSpeciality(mutateSpeciality.data.data.speciality)
        }
    }, [mutateSpeciality.isSuccess])

    const handleSpeciality = () => {
    if(!speciality) return 

    if(isUser(user)){
        mutateSpeciality.mutate({userID: user._id, speciality: speciality})
    }

    setChangeSpeciality(false)
    }

    return (
        <>
            {isUser(user) && <p style={{display: !changeText && user.role === 'Студент' ? 'flex' : 'none'}} className='pt-[10px] items-center gap-[5px]'>
                <span>Специальность: {!changeSpeciality ? user.speciality ? user.speciality : 'отсутствует' : ''}</span>
                <input onChange={e => setSpeciality(e.target.value)} className='outline-none' placeholder='специальность' style={{display: !changeSpeciality ? 'none' : 'flex'}}/>
                <button onClick={() => setChangeSpeciality(!changeSpeciality)} className='bg-white shadow-xl p-[3px] flex justify-center items-center w-[23px] h-[23px]' style={{display: changeSpeciality ? 'none' : 'flex'}}>
                <img className='w-[17px]' src={Edit}></img>
                </button>
                <button onClick={() => setChangeSpeciality(false)} className='bg-white shadow-xl p-[3px] flex justify-center items-center w-[23px] h-[23px]' style={{display: !changeSpeciality ? 'none' : 'flex'}}>
                <img className='w-[17px]' src={Back}></img>
                </button>
                <button onClick={() => handleSpeciality()} className='bg-white shadow-xl p-[3px] flex justify-center items-center w-[23px] h-[23px]' style={{display: !changeSpeciality ? 'none' : 'flex'}}>
                <img className='w-[17px]' src={Check}></img>
                </button>
            </p>
            }
        </>
    )
}
