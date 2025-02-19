import React, { useEffect, useState } from 'react'
import { TypePost } from '../../types/types'
import { DeleteQuestion } from '../Modals/DeleteQuestion'
import Delete from '../../images/delete.png'
import { useMutation } from 'react-query'
import { questionsService } from '../../service/questionsService'
import { useQuestionsStore } from '../../zustand/questions'
import { useNavigate } from 'react-router-dom'

type Props = {
    question: TypePost
}

export const Post: React.FC<Props> = ({question}) => {

    const {mutate, data, isSuccess} = useMutation(questionsService.moderationQuestion, {
        mutationKey: ['mutateModeration']
    })

    const moderationQuestion = useQuestionsStore(el => el.moderationQuestion)

    useEffect(() => {
        if(isSuccess){
            moderationQuestion(data.data)
        }
    }, [isSuccess])

    const [modal, setModal] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>('')
    
    const navigate = useNavigate()

    const openDeleteModal = (id: string) => {
        setPostId(id)
        setModal(true)
    }
  
    const openQuestionFn = (id: string) => {
        navigate(`/question/${id}`)
    }

    //функция которая возвращает нужное склонение слова пользователь
    function getUserEnding(count: number) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
    
        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return " пользователь";
        } else if ((lastDigit >= 2 && lastDigit <= 4) && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
            return " пользователя";
        } else {
            return " пользователей";
        }
    }

    return (
        <>
        <div key={question._id} className={`bg-gray-200 py-[10px] px-[15px] grid rounded-md relative w-full`}>
            <div className='absolute top-[10px] right-[15px] flex gap-[10px]'>
                {question.moderation === false ? <>
                    <button onClick={() => mutate({postId: question._id, moderation: false})} className='p-[7px] px-[9.5px] bg-slate-100 shadow-custom-rounded rounded-full flex items-center hover:shadow-custom-hoverShadow'>
                        нет
                    </button>
                    <button onClick={() => mutate({postId: question._id, moderation: true})} className='p-[7px] px-[9.5px] bg-slate-100 shadow-custom-rounded rounded-full flex items-center hover:shadow-custom-hoverShadow'>
                        да
                    </button>
                </> : 
                    <div
                    onClick={() => openDeleteModal(question._id)}
                    className='p-[7px] px-[9.5px] bg-slate-100 shadow-custom-rounded rounded-full flex items-center hover:shadow-custom-hoverShadow delay-75' 
                    >
                        <img alt='delete-btn' className='w-[25px] h-[25px]' src={Delete}></img>
                    </div>
                }
            </div>
                <h1 className='text-[21px] break-words overflow-hidden text-ellipsis whitespace-nowrap max-w-[85%]'>Название: {question.title}</h1>
                <p className='text-[16px] pt-[2px]'>Описание: {question.text === null ? 'отсутствует' 
                : question.text.length > 50 ? question.text.slice(0, 50) + '........' : question.text ? question.text : 'отсутствует'}</p>
                <div className='flex gap-[10px] pt-[2px]'>
                {question.tags.length ? question.tags.map(t => (
                    <p key={t.id} className='text-[16px]'>#{t.tag}</p>
                )) : <p>Тэги отсутствуют</p>}
                </div>
                <div className='flex items-end justify-between pb-[5px]'>
                <div className='flex gap-[20px]'>
                    <div className='flex gap-[5px] pt-[5px]'>
                        <p>Ответов: {question.comments.length}</p>
                        <p>Оценили: {question.likes.length} 
                            {getUserEnding(question.likes.length)}
                        </p> 
                    </div>
                </div>
                <button onClick={() => openQuestionFn(question._id)} className='button-hover'>Перейти</button>
                </div>
            </div>
            <DeleteQuestion  modal={modal} setModal={setModal} postId={postId} setPostId={setPostId}/>
        </>
    )
}
