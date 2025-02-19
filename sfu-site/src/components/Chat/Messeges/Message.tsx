import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { isUser } from '../../../utils/checkValue'
import { Message as TypeMessage } from '../../../types/types'

type Props = {
    ind: number, 
    message: TypeMessage
}

export const Message: React.FC<Props> = ({message, ind}) => {

    const state = useAppSelector(el => el.auth.state)

    return (
        <React.Fragment>
            {isUser(state) && <>
                <p className="text-center">
                    {state.chat[ind - 1]?.date.slice(0, 10) !== message.date.slice(0, 10) &&
                    message.date.slice(0, 10)}
                </p>
                <div
                    className={`${
                        message.status === 'user' ? 'ml-auto mr-[10px]' : 'ml-[15px]'
                    } bg-gray-100 my-4 w-2/3 py-1 px-2 rounded-[3px] block break-words`}
                >
                    <p>{message.text}</p>
                </div>
            </>}
        </React.Fragment>
    )
}
