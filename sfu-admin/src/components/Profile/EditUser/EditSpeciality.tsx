import React from 'react'
import Edit from '../../../images/edit.svg'
import Back from '../../../images/back.svg'
import Check from '../../../images/check.svg'
import { isUser } from '../../../utils/checkValue'
import { useParams } from 'react-router-dom'
import { useEditSpeciality } from '../../../hooks/hooks'

type Props = {
    changeText: boolean
}

export const EditSpeciality: React.FC<Props> = ({changeText}) => {

    const {id} = useParams()

    const {user, setSpeciality, setChangeSpeciality, changeSpeciality, handleSpeciality} = useEditSpeciality(id as string)

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
