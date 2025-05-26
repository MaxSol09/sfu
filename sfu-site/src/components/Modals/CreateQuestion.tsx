import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
import { changePage } from '../../redux/page'
import uniqid from 'uniqid'
import { createQuestion, fetchTags, resetPostStatus } from '../../redux/questions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TypeTags } from '../../types/types'
import { isUser } from '../../utils/checkValue'

export const CreateQuestion: React.FC = () => {

  const dispatch = useAppDispatch()
  const state = useAppSelector(el => el.auth.state)
  const [description, setDescription] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const statusCreate = useAppSelector(el => el.questions.questionChanges.status)

  const [errorTitle, setTitleError] = useState<boolean>(false)
  const [errorTag, setErrorTag] = useState<boolean>(false)

  const variants = [
    {value: 'Поступление', id: 1},
    {value: 'Общежитие', id: 2},
    {value: 'Стипендия', id: 3},
    {value: 'Хакатоны', id: 4},
    {value: 'Кафедры', id: 5},
    {value: 'Мероприятия', id: 6},
    {value: 'Университет', id: 7},
    {value: 'Факультет', id: 8},
    {value: 'Другое', id: 9},
  ]
  

  const [tags, setTags] = useState<TypeTags[]>([])
  const id = uniqid()

  useEffect(() => {
    if(statusCreate === 'success'){

      dispatch(changePage({type: 'HOME'}))

      setTag('')
      setTitle('')
      setDescription('')
      setTags([])

      dispatch(resetPostStatus())
    }
  }, [statusCreate, dispatch])


  const submit = () => {

    if(title.length < 10 || title.length > 100) setTitleError(true)
    if(!tags.length) setErrorTag(true)

    if(title.length < 10 || title.length > 100 || !tags.length) return
      

    if(isUser(state)){
      const questionData = {text: description, title, tags, userId: state._id, postId: id}
          
      dispatch(createQuestion(questionData));
      dispatch(fetchTags())
    }

  }

  const changeTitle = (e:string) => {
    setTitle(e)
    setTitleError(false)
  }

  const changeTag = (val: string) => {
    setTags([{tag: val, id: id}])
    setTag(val)
    setErrorTag(false)
  }

  return (
    <div className='w-[100%] py-[20px] pb-[35px] max-[530px]:w-[100%] max-[640px]:py-[10px] max-[640px]:px-[20px] px-[80px] flex flex-col shadow-custom-rounded m-auto max-[640px]:w-[85%] max-[600px]:mb-[100px]'>
      <div className='w-full'>
        <input value={title} onChange={e => changeTitle(e.target.value)} className='text-gray-500 border-b-[3px] w-full outline-none 
        focus:border-b-blue-300 py-[10px] px-[10px] text-[20px] max-[540px]:text-[18px]' type="text" placeholder='Введите вопрос'/>
        {errorTitle && <p className='text-red-400 text-[18px] py-[10px]'>{title.length > 100 ? 'максимум 100 символов' : 'минимум 10 символов'}</p>}
      </div>
      <div className={`grid gap-[10px] ${errorTitle ? 'pt-[0px]' : 'pt-[15px]'}`}>
        <h1 className='text-gray-500 text-[19px] break-all max-[540px]:text-[18px]'>
          Выберите тему вопроса
          <span className='text-[23px] text-red-500 pl-[2px]'>{errorTag && '*'}</span>
        </h1>
        <div className='parent text-[18px] gap-[10px] pl-[5px] max-[540px]:text-[16px] max-[540px]:gap-[5px] max-[360px]:gap-[0px]'>
          {variants.map(el => (
            <p onClick={() => changeTag(el.value)} className={`${tag === el.value ? 'text-slate-500' : 'text-gray-400'} 
              ${tag === el.value ? 'rounded-[5px] border-gray-400' : 'border-white'} border-[1px] py-[3px] text-center 
              cursor-pointer hover:text-slate-500`} key={el.id}>
              {el.value}
            </p>
          ))}
        </div>
      </div>
      <div className='pt-[15px]'>
        <div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className={`text-gray-500 w-full border-[2px] outline-none py-[10px] 
          px-[10px] text-[20px] h-[300px] overflow-auto max-h-[300px] min-h-[300px] max-[540px]:max-h-[250px] max-[540px]:min-h-[250px] max-[540px]:text-[18px]
          ${description.length > 500 ? 'focus:border-red-400 border-red-400' : 'focus:border-blue-300'}`} placeholder='Описание...'/>
          <p className={`${description.length > 500 && 'text-red-600'}`}>{description.length}/500 символов</p>
        </div>
      </div>
      <div className='flex justify-between pt-[15px]'>
        <Button disabled={statusCreate === 'loading' ? true : false} onClick={() => dispatch(changePage({type: 'HOME'}))}
         className='px-[30px] py-[10px] text-[18px] max-[350px]:px-[13px]'>
          Назад
        </Button>
        <Button disabled={statusCreate === 'loading' ? true : false} onClick={() => submit()} type='primary' className='text-[16px] max-[350px]:px-[5px]'>Опубликовать</Button>
      </div>
    </div>
  )
}

