import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { fetchTags } from '../../../redux/questions'
import { Skeleton } from 'antd'
import { Tag } from './Tag'

export const Tags = () => {
  const dispatch = useAppDispatch()
  const statusTags = useAppSelector(el => el.questions.tags.status)
  const tags = useAppSelector(el => el.questions.tags.items)

  useEffect(() => {
    if(statusTags === 'loading'){
      dispatch(fetchTags())
    }
  }, [statusTags, dispatch])

  return (
    <div className='bg-slate-100 py-[15px] px-[20px] text-[17px] min-h-[200px]'>
      <h1 className='text-[18px] mb-[10px]'>Популярные темы</h1>
      {tags.length ? tags.map(tag => (
        <Tag key={tag.tag} tag={tag}/>
        )) : statusTags === 'loading' ? <Skeleton active title={false} paragraph={{rows: 5}} className='w-full pb-[10px]'/> 
        : <p>Темы отсутствуют</p>
      }
    </div>
  )
}
