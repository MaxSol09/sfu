import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../redux/hooks';
import { isUser } from '../../../utils/checkValue';
import { Message } from './Message';

export const Messages: React.FC = () => {

    const { state } = useAppSelector((el) => el.auth);
    const support = useAppSelector((el) => el.page.support);

    const messageRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if (support && messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [support, messageRef])

    return (
        
        <div ref={messageRef} className="py-3 relative overflow-auto scrollbar-thin h-[70%]">
            {isUser(state) ? (
                state.chat.map((msg, ind) => (
                    <Message key={ind} ind={ind} message={msg}/>
                ))
            ) : (
                <p>Нет сообщений</p>
            )}
        </div>
    )
}
