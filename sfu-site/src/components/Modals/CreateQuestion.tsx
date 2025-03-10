import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
import { changePage } from '../../redux/page'
import uniqid from 'uniqid'
import { createQuestion, fetchTags, resetPostStatus } from '../../redux/questions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TypeTags } from '../../types/types'

export const CreateQuestion: React.FC = () => {

  const dispatch = useAppDispatch()
  const state = useAppSelector(el => el.auth.state)
  const [textNum, setTextNum] = useState<string>('')
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
      setTextNum('')
      setTags([])

      dispatch(resetPostStatus())
    }
  }, [statusCreate, dispatch])


  const submit = () => {

    if(title.length < 10 || title.length > 100) setTitleError(true)
    if(!tags.length) setErrorTag(true)

    if(title.length < 10 || title.length > 100 || !tags.length) return
      

    if('_id' in state){
      const questionData = {text: textNum, title, tags, userId: state._id, postId: id}
          
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

  console.log(tags)

  return (
    <div className=' ml-[100px] w-[80%] py-[20px] pb-[35px] px-[80px] flex flex-col shadow-custom-rounded'>
      <div className='w-full'>
        <input value={title} onChange={e => changeTitle(e.target.value)} className='text-gray-500 border-b-[3px] w-full outline-none focus:border-b-blue-300  py-[10px] px-[10px] text-[20px]' type="text" placeholder='Введите вопрос'/>
        {errorTitle && <p className='text-red-400 text-[18px] py-[10px]'>{title.length > 100 ? 'максимум 100 символов' : 'минимум 10 символов'}</p>}
      </div>
      <div className={`grid gap-[10px] ${errorTitle ? 'pt-[0px]' : 'pt-[15px]'}`}>
        <h1 className='text-gray-500 text-[19px] break-all'>
          Выберите тему вопроса
          <span className='text-[23px] text-red-500 pl-[2px]'>{errorTag && '*'}</span>
        </h1>
        <div className='parent text-[18px] gap-[10px] pl-[5px]'>
          {variants.map(el => (
            <p onClick={() => changeTag(el.value)} className={`${tag === el.value ? 'text-slate-500' : 'text-gray-400'} ${tag === el.value ? 'rounded-[5px] border-gray-400' : 'border-white'} border-[1px] py-[3px] text-center cursor-pointer hover:text-slate-500`} key={el.id}>{el.value}</p>
          ))}
        </div>
      </div>
      <div className='pt-[15px]'>
        <div>
          <textarea value={textNum} onChange={e => setTextNum(e.target.value)} className={`text-gray-500 w-full border-[2px] outline-none py-[10px] px-[10px] text-[20px] h-[300px] overflow-auto max-h-[300px] min-h-[300px] ${textNum.length > 500 ? 'focus:border-red-400 border-red-400' : 'focus:border-blue-300'}`} placeholder='Описание...'/>
          <p className={`${textNum.length > 500 && 'text-red-600'}`}>{textNum.length}/500 символов</p>
        </div>
      </div>
      <div className='flex justify-between pt-[15px]'>
        <Button disabled={statusCreate === 'loading' ? true : false} onClick={() => dispatch(changePage({type: 'HOME'}))}
         className='px-[30px] py-[10px] text-[18px]'>
          Назад
        </Button>
        <Button disabled={statusCreate === 'loading' ? true : false} onClick={() => submit()} type='primary' className='text-[16px]'>Опубликовать</Button>
      </div>
    </div>
  )
}

