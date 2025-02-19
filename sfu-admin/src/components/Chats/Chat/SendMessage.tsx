import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { usersService } from '../../../service/usersService';
import { useUserStore } from '../../../zustand/auth';

export const SendMessage: React.FC = () => {

    const [text, setText] = useState<string>('')

    const selectChat = useUserStore(el => el.selectChat)

    const mutateMessage = useMutation(usersService.sendMessage, {
        mutationKey: ['sendMessage', selectChat.id]
    })

    const sendMessageFn = (e: any) => {

        e.preventDefault()

        if(text && !mutateMessage.isLoading){
            mutateMessage.mutate({userID: selectChat.id, status: 'admin', text})
            setText('')
        }
    }

    return (
        <div className='flex justify-end'>
            <form onSubmit={e => sendMessageFn(e)} className='flex mx-[30px] absolute bottom-[15px] gap-[20px] w-1/3'>
                <input value={text} onChange={e => setText(e.target.value)} className='p-[5px] outline-none w-full border-gray-300 border-[1px]' placeholder='написать сообщение'></input>
                <button onClick={e => sendMessageFn(e)} className='p-[5px] bg-gray-300 hover:bg-gray-200' style={{transition: '0.9s'}}>отправить</button>
            </form>
        </div>
    )
}
