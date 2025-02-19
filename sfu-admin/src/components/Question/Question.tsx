import { useEffect } from 'react'
import Eyes from '../../images/eyes.svg'
import Comment from '../../images/comments.svg'
import { Layout, Skeleton } from 'antd'
import { useQuestionsStore } from '../../zustand/questions'
import { useQuery } from 'react-query'
import { questionsService } from '../../service/questionsService'
import { isPost } from '../../utils/checkValue'
import { Comments } from '../Question/Comments'
import { useParams } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { Panel } from '../Panel'

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
};

export const Question = () => {

  const question = useQuestionsStore(el => el.question.items)

  const {id} = useParams()

  const getQuestionFn = useQuestionsStore(el => el.getQuestion)

  const getQuestion = useQuery({
    queryFn: () => questionsService.getQuestion(id as string),
    queryKey: ['getQuestion', id],
    select: data => data.data
  })

  useEffect(() => {
    if(getQuestion.isSuccess){
      getQuestionFn(getQuestion.data)
    }
  }, [getQuestion.isSuccess])

  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width='18%' className="bg-gray-200">
          <Panel currPage='question'></Panel>
        </Sider>
        <Content>
        <main className='z-0 pt-[50px] grid place-items-center'>
          {getQuestion.isLoading ? (
          <Skeleton paragraph={{rows: 6}} className='pb-[60px] pt-[10px] w-2/3'/>
        ) : isPost(question) ? <div className='px-[20px] pt-[10px] pb-[10px] w-2/3 bg-gray-200'>
              <h1 className='text-[20px] break-all'>Название: {question.title}</h1>
              <p className='text-[19px] pt-[5px] break-all'>
                {question.text.length > 0 ? `Описание: ${question.text}` : 'Описание отсутствует'}
              </p>
              <div className='flex gap-[30px]'>
                {question.tags.length ? question.tags.map(el => (
                  <div key={el.id} className='text-[18px] text-gray-500 pt-[10px]'>#{el.tag}</div>
                )): <p>Тэги отсутствуют</p>}
              </div>
              <div className='flex justify-between pt-[20px]'>
                <div className='flex gap-[10px]'>
                  <div className='flex gap-[3px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>{question.viewCount}</p>
                  </div>
                  <div className='flex gap-[3px]'>
                    <img src={Comment} alt="комменты" />
                    <p>{question.comments.length}</p>
                  </div>
                </div>
                <p>Дата: {question.createdAt.slice(0, 10)} <span className='pl-[15px]'>Время публикации: {+question.createdAt.slice(11, 13) + 3}{question.createdAt.slice(13, 16)}</span></p>
              </div>
            </div>
            : <p>Вопрос не найден</p>}
            {getQuestion.isLoading ? <Skeleton title={false} className='w-2/3' paragraph={{rows: 2}} avatar/> 
            : 'comments' in question && <Comments comments={question.comments}/> }
          </main>
        </Content >
      </Layout>
    </>
  )
}
