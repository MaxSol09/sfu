import React, { useEffect, useState } from 'react'
import { TypePost } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { createLike, createLikeFn, deleteQuestion } from '../../redux/questions'
import Like2 from '../../images/Like2.png'
import Like from '../../images/Like.png'
import Delete from '../../images/del.png'
import { isPost, isUser } from '../../utils/checkValue'
import { Box, Modal } from '@mui/material'
import { checkTwoArrayId } from '../../utils/checkTwoArrayId'
import { getUserEnding } from '../../utils/getUserEnd'

type Props = {
    question: TypePost
}

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '10px',
    outline: 'none',
    boxShadow: 24,
    padding: '15px 25px'
};

export const Post: React.FC<Props> = ({question}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const state = useAppSelector(el => el.auth.state)
    const [modal, setModal] = useState<boolean>(false)
    const [id, setId] = useState<string>('')

    const openQuestion = (id: string) => {
        navigate(`/question/${id}`)
    }

    const deleteQuest = () => {
        dispatch(deleteQuestion(id))
        setModal(false)
    } 
  
    const clickDelete = (ID: string) => {
        setModal(true)
        setId(ID)
    }

    const url = window.location.pathname


    const handleLike = () => {

        if(isUser(state)){
            dispatch(createLikeFn({result: {name: "Максим",
                _id: state._id,
                status: !checkTwoArrayId(question.likes, state._id) ? "like" : 'dislike',
                postID: question._id,
                fullName: state.fullName
            }}))

            dispatch(createLike({ postID: question._id, userID: state._id, fullName: state.fullName}))
        }
    

    }

  return (
    <>
        {isPost(question) && 
            <div key={question._id} className={`bg-slate-100 py-[10px] px-[15px] grid rounded-md relative 
                 ${url === '/' ? 'w-full' : 'w-full'}`}>
                <div className='absolute top-[10px] right-[15px] flex gap-[10px] max-[470px]:hidden'>
                    {isUser(state) ? <button onClick={() => handleLike()} 
                        className='bg-slate-100 shadow-custom-rounded p-[7px] rounded-full flex items-center hover:shadow-custom-hoverShadow'
                        style={{transition: 'all 0.9s', display: question.moderation ? 'flex' : 'none'}}
                        >
                        <img alt='like' className='w-[30px]' src={isUser(state) && checkTwoArrayId(question.likes, state._id) ? Like2 : Like}></img>
                    </button> : ''}
                    <button style={{display: question.user === null ? 'none' : isUser(state) &&  state._id === question.user._id ? 'flex' : 'none', transition: 'all 0.9s'}} 
                        className='p-[7px] px-[9.5px] bg-slate-100 shadow-custom-rounded rounded-full flex items-center hover:shadow-custom-hoverShadow' 
                        onClick={() => clickDelete(question._id)}>
                        <img alt='delete-btn' className='w-[25px] h-[25px]' src={Delete}></img>
                    </button>
                </div>
                <div className='absolute top-[10px] right-[15px] gap-[10px] hidden max-[470px]:flex'>
                    <button onClick={() => isUser(state) && dispatch(createLike({ postID: question._id, userID: state._id, fullName: state.fullName}))} 
                        className='bg-slate-100 shadow-custom-rounded p-[7px] rounded-full flex items-center hover:shadow-custom-hoverShadow'
                        style={{transition: 'all 0.9s', display: question.moderation ? 'flex' : 'none'}}
                        >
                        <img alt='like' className='w-[30px]' src={isUser(state) && checkTwoArrayId(question.likes, state._id) ? Like2 : Like}></img>
                    </button>
                </div>
                <h1 className='text-[21px] max-[500px]:text-[19px] overflow-hidden text-ellipsis break-words max-w-[80%]'>
                    Название: {question.title}
                </h1>
                <p className='text-[16px] pt-[2px] overflow-hidden text-ellipsis whitespace-nowrap break-words max-w-[80%]'>
                    Описание: {!question.text.length ? 'отсутствует' : question.text}
                </p>
                <div className='flex gap-[10px] py-[5px]'>
                    {question.tags.length ? question.tags.map(t => (
                    <p key={t.id} className='text-[16px]'>#{t.tag}</p>
                    )) : <p>Тэги отсутствуют</p>}
                </div>
                <div className='flex items-end justify-between pb-[5px] max-[590px]:flex-wrap'>
                    <div className='flex gap-[20px] pb-[5px]'>
                        <div className='flex gap-[5px]'>
                            <p>Ответов: {question.comments.length}</p>
                        </div>
                        <div className='flex gap-[5px]'>
                            <p>Оценили: {question.likes.length} 
                            {getUserEnding(question.likes.length)}
                            </p> 
                        </div>
                    </div>
                    <div className=' max-[450px]:flex hidden'>
                        <button style={{display: question.user === null ? 'none' : isUser(state) && state._id === question.user._id ? 'flex' : 'none', transition: 'all 0.9s', background: "red"}} 
                            className='p-[7px] px-[9.5px] button-hover' 
                            onClick={() => clickDelete(question._id)}>
                            удалить
                        </button>
                    </div>
                    <button className='button-hover max-[590px]:flex max-[590px]:ml-auto max-[590px]:mt-[5px]' onClick={() => openQuestion(question._id)}   
                        >{isUser(state) && state.role === 'Студент' ? 'Ответить' : 'Перейти'}
                    </button>
                </div>
        </div>}
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h1 className='text-[20px]'>
                Вы уверены, что хотите удалить вопрос?
                </h1>
                <div className='flex gap-[15px] justify-end pt-[20px]'>
                    <button onClick={() => setModal(false)} className='border-[1px] rounded-[5px] border-gray-400 py-[5px] px-[15px] text-[17px] hover:border-blue-500 hover:text-blue-500'>нет</button>
                    <button onClick={() => deleteQuest()} className='rounded-[5px] bg-blue-500 py-[5px] px-[20px] text-white text-[17px] hover:bg-blue-400'>да</button>
                </div>
            </Box>
        </Modal>
    </>
  )
}
