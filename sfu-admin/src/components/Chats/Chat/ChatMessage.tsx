import React from 'react'
import { Message } from '../../../types/types'

type Props = {
    message: Message,
    messages: Message[],
    index: number
}

export const ChatMessage: React.FC<Props> = ({message, index, messages}) => {
    return (
        <div>
            <p className='text-center'>
                {messages[index - 1]?.date.slice(0, 10) !== message.date.slice(0, 10) &&
                message.date.slice(0, 10)}
            </p>
            <div className={`flex  ${message.status === 'user' ? 'justify-start ml-[20px]' : 'justify-end mr-[20px]'} my-4`}>
                <div className={`bg-gray-200 py-[4px] px-[16px] rounded-[3px] break-words ${message.status === 'user' ? 'mr-[50%]' : 'ml-[50%]'} `}>
                    <p className='break-words max-w-full inline-block'>{message.text}</p>
                </div>
            </div>
        </div>
    )
}
