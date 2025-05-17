import React, { useEffect, useState } from 'react'
import { isUser } from '../../../utils/checkValue'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeTextFun } from '../../../redux/auth'

type Props = {
    changeText: boolean,
    setChangeText: any
}

export const EditText: React.FC<Props> = ({changeText, setChangeText}) => {

    const [text, setText] = useState<string>('')

    const user = useAppSelector(el => el.auth.user.value)
    const state = useAppSelector(el => el.auth.state)

    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(isUser(user)){
            setText(user.text)
        }
    }, [user])    

    const submit = () => {
        if(text.length > 300) return 
        
        setChangeText(false)
        if(isUser(state)){
        dispatch(changeTextFun({userID: state._id, text})) // меняем текст в профиле
        }
    }

    return (
        <div className='w-full' style={{display: changeText ? 'grid' : 'none'}}>
            <div className='w-full gap-[20px] items-end flex max-[750px]:grid'>
                <div className='w-full'>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className='min-h-[300px] text-xl mt-6 p-2 max-h-[300px] w-full focus:outline-blue-400' style={{display: changeText ? 'flex' : 'none'}} placeholder='Расскажите что-нибудь о себе'></textarea>
                    <p className='pt-[10px]' style={{color: text.length > 300 ? 'red' : 'black'}}>Символов: {text.length}/300</p>
                </div>
                <div className='flex min-[750px]:flex-col gap-[10px] max-[750px]:justify-end min-[750px]:mb-[35px]'>
                    <button onClick={() => setChangeText(false)} style={{padding: '5px 15px', fontSize: '17px', transition: 'all 0.9s'}} className='bg-white border-[1px] border-gray-300 rounded-[5px] hover:border-blue-400'>Назад</button>
                    <button onClick={() => submit()} style={{padding: '5px 15px', fontSize: '17px', transition: 'all 0.9s'}} className='bg-white border-[1px] border-gray-300 rounded-[5px] hover:border-blue-400'>Сохранить</button>
                </div>
            </div>
        </div>
    )
}
