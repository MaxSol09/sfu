import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
import { changeOpenFormCreate, changePage } from '../redux/page.ts'
import uniqid from 'uniqid'
import { createQuestion } from '../redux/questions.ts'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'

export const CreateQuestion = () => {

  const dispatch = useAppDispatch()
  const state = useAppSelector(el => el.auth.state)
  const [textNum, setTextNum] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const statusCreate = useAppSelector(el => el.questions.questionChanges.status)

  type Tag = {
    tagText: string,
    id: string
  }

  const [tags, setTags] = useState<Tag[]>([])
  const id = uniqid()


  useEffect(() => {
    if(statusCreate === 'success'){
      dispatch(changePage({type: "HOME"}))
      dispatch(changeOpenFormCreate())
    }
  }, [statusCreate])


  const submit = () => {
    console.log({text: textNum, title, tags, userId: state._id})

    if('_id' in state){
      const questionData = {text: textNum, title, tags, userId: state._id, postId: id}
          
      dispatch(createQuestion(questionData));
    }

  }
  

  const form = useAppSelector(el => el.page.form)

  const deleteTag = (tagId: string) => {
    setTags(tags.filter(el => el.id !== tagId))
  }

  const createTagFun = () => {
    if(tags.find(i => i.tagText === tag)) return 

    else if(tags.length < 4 && tag.length >= 3 && tag.length <= 15){
      setTags([...tags, {tagText: tag, id: id}])
    }

    setTag('')
  }

  console.log(tags)

  return (
    <form style={{display: form === true ? 'grid' : 'none'}} className=' ml-[100px] w-[80%] py-[20px] pb-[35px] px-[80px] flex flex-col gap-[20px] shadow-custom-rounded'>
      <input onChange={e => setTitle(e.target.value)} className='text-gray-500 border-b-[3px] outline-none focus:border-b-blue-300 py-[10px] px-[10px] text-[20px]' type="text" placeholder='Введите вопрос'/>
      <div className='flex items-center gap-[30px]'>
        <input value={tag} onChange={e => setTag(e.target.value)} className='text-gray-500 w-full border-b-[3px] outline-none focus:border-b-blue-300 py-[10px] px-[10px] text-[20px]' type="text" placeholder='Добавить тэг'/>
        <Button onClick={() => createTagFun()} className='p-[20px] text-[18px]'>Добавить</Button>
      </div>
      <div className='flex gap-[20px]'>
        {tags.length > 0 ? tags.map(el => (
            <div key={el.id} className='flex items-center gap-[10px] px-[15px] py-[6px] bg-gray-200'>{el.tagText}
              <button onClick={() => deleteTag(el.id)} className='text-[23px] cursor-pointer'>&times;</button>
            </div>
          )) : ''}
      </div>
      <div>
        <div>
          <textarea onChange={e => setTextNum(e.target.value)} className={`text-gray-500 w-full border-[2px] outline-none py-[10px] px-[10px] text-[20px] h-[300px] overflow-auto max-h-[300px] min-h-[300px] ${textNum.length > 500 ? 'focus:border-red-400 border-red-400' : 'focus:border-blue-300'}`} type="text" placeholder='Описание(необязательно)'/>
          <p style={{color: textNum.length > 500 && 'red'}}>{textNum.length}/500 символов</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <Button onClick={() => dispatch(changeOpenFormCreate())} type='primary' className='px-[30px] py-[10px] bg-blue-500 text-white text-[18px]'>Назад</Button>
        <Button onClick={() => submit()} className='text-[16px]'>Опубликовать</Button>
      </div>
    </form>
  )
}

