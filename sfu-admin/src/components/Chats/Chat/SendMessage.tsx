import React from 'react'
import { useSendMessage } from '../../../hooks/hooks';

export const SendMessage: React.FC = () => {

    const {text, setText, sendMessage} = useSendMessage()

    return (
        <div className='flex justify-end'>
            <form onSubmit={e => sendMessage(e)} className='flex mx-[30px] absolute bottom-[15px] gap-[20px] w-1/3'>
                <input value={text} onChange={e => setText(e.target.value)} className='p-[5px] outline-none w-full border-gray-300 border-[1px]' placeholder='написать сообщение'></input>
                <button onClick={e => sendMessage(e)} className='p-[5px] bg-gray-300 hover:bg-gray-200' style={{transition: '0.9s'}}>отправить</button>
            </form>
        </div>
    )
}
