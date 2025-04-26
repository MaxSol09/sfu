import React, { useState } from 'react'
import { isUser } from '../../utils/checkValue';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { sendMessage } from '../../redux/auth';
import Send from '../../images/send.png'

export const SendMessage: React.FC = () => {

    const [text, setText] = useState('');
    const dispatch = useAppDispatch();

    const { state } = useAppSelector((el) => el.auth);

    const send = () => {
        if (!text) return;

        if (isUser(state)) {
            dispatch(
                sendMessage({
                    text,
                    userID: state._id,
                    status: 'user',
                    fullName: state.fullName,
                })
            )
            setText('')
        }
    }

    return (
        <div className="flex justify-between w-full px-4 py-1 gap-3 pb-1 absolute bottom-[5px]">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="items-center overflow-auto overflow-x-hidden overflow-y-hidden w-full pb-1 outline-none resize-none"
                placeholder="Cообщение:"
            />
            <div
                onClick={() => send()}
                className="flex w-[58px] justify-center items-center px-2 mb-1 rounded-[50%] bg-slate-200 shadow-custom-rounded hover:bg-slate-300 duration-200"
            >
                <img className='w-[27px]' src={Send} alt="Send"></img>
            </div>
        </div>
    )
}
