import React from 'react'
import { useChangeText } from '../../../hooks/hooks'

type Props = {
    setChangeText: any,
    changeText: boolean
}

export const EditText: React.FC<Props> = ({setChangeText, changeText}) => {

    const {text, setText, submit} = useChangeText(setChangeText)

    return (
        <>
            <button onClick={() => setChangeText(true)} 
                style={{padding: '5px 15px', fontSize: '16px', 
                display: changeText ? 'none' : 'flex', height: 'fit-content', transition: 'all 0.9s'}} 
                className='bg-white border-[1px] border-gray-300 rounded-[5px] hover:border-blue-400'>
                Редактировать
            </button>
            <div className='w-full' style={{display: changeText ? 'grid' : 'none'}}>
            <div className='w-full gap-[20px] items-end flex'>
                <textarea value={text} onChange={(e) => setText(e.target.value)} className='min-h-[300px] text-xl mt-6 p-2 max-h-[300px] w-full focus:outline-blue-400' 
                    style={{display: changeText ? 'flex' : 'none'}} placeholder='Расскажите что-нибудь о себе'></textarea>
                    <div className='flex flex-col gap-[10px]'>
                        <button onClick={() => setChangeText(false)} style={{padding: '5px 15px', fontSize: '17px', transition: 'all 0.9s'}} className='bg-white border-[1px] border-gray-300 rounded-[5px] hover:border-blue-400'>
                            Назад
                        </button>
                        <button onClick={() => submit()} style={{padding: '5px 15px', fontSize: '17px', transition: 'all 0.9s'}} className='bg-white border-[1px] border-gray-300 rounded-[5px] hover:border-blue-400'>
                            Сохранить
                        </button>
                    </div>
                </div>
                <p className='pt-[10px]' style={{color: text.length > 300 ? 'red' : 'black'}}>Символов: {text.length}/300</p>
            </div>
        </>
    )
}
