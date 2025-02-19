import React, { useEffect, useRef } from 'react'
import { Message } from '../../../types/types'
import { ChatMessage } from './ChatMessage';
import { SendMessage } from './SendMessage';

type Props = {
    messages: Message[]
}

export const ChatsPosts: React.FC<Props> = ({ messages }) => {

    const messageRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [messages])


    return (
        <>
            <div className='grid h-full'>
                {messages.length ? (
                    <div ref={messageRef} className='grid gap-[10px] relative overflow-auto scrollbar-thin h-[95%]'>
                        <div className='break-all'>
                            {messages.map((message, ind) => (
                                <ChatMessage key={ind} message={message} messages={messages} index={ind}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Выберите чат</p>
                )}
                <SendMessage />
            </div>
        </>
    );
};