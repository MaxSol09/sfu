import React, { useEffect, useState } from 'react'
import {Layout} from 'antd'
import { useQuestionsStore } from '../zustand/questions'
import { useQuery } from 'react-query'
import { questionsService } from '../service/questionsService'
import Sider from 'antd/es/layout/Sider'
import { Panel } from '../components/Panel'
import { Content } from 'antd/es/layout/layout'
import { Posts } from '../components/Posts/Posts'
import { FilterQuestions } from '../components/Questions/FilterQuestions'
import { SearchQuestions } from '../components/Questions/SearchQuestions'

export const Questions: React.FC = () => {

    const questions = useQuestionsStore(el => el.questions.items)
    const questionsModeration = useQuestionsStore(el => el.questionsModeration.items)
    const questionsArr = useQuestionsStore(el => el.questionsArr.items) 

    const getAllQuestions = useQuestionsStore(el => el.getAllQuestions)

    const [moderationPosts, setModerationPosts] = useState<boolean>(false)

    const questionsData = useQuery({
        queryKey: ['questionsKEY'],
        queryFn: questionsService.getQuestions,
        select: data => data.data
    })

    useEffect(() => {
        if(questionsData.isSuccess){
            getAllQuestions(questionsData.data)
        }
    }, [questionsData.isSuccess])


    const clickTabs = (moderation: boolean) => {
        setModerationPosts(moderation)
        getAllQuestions(questionsArr.length ? questionsArr : questionsData.data)
    }

    const layoutStyle: React.CSSProperties = {
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
    };   

    return (
        <>
            <Layout style={layoutStyle}>
                <Sider width='18%' className="bg-gray-200">
                    <Panel currPage='questions'></Panel>
                </Sider>
                <Content>
                    <div className='overflow-auto h-[100vh]'>
                        <div className='grid w-4/5 m-auto'>
                            <div className='flex justify-between items-center mt-[20px] flex-wrap break-all'>
                                <div className='flex justify-center gap-[30px] text-[18px] cursor-pointer'>
                                    <p onClick={() => clickTabs(false)} className={`${!moderationPosts && 'underline'}`}>Опубликованные</p>
                                    <p onClick={() => clickTabs(true)} className={`${moderationPosts && 'underline'}`}>На модерации</p>
                                </div>
                                <SearchQuestions moderationPosts={moderationPosts}/>
                            </div>
                            <div className='flex items-center justify-between pt-[20px]'>
                                <h1 className='text-[18px]'>Всего вопросов: {moderationPosts ? questionsModeration.length : questions.length}</h1>
                                <FilterQuestions />
                            </div>
                            <Posts loadingQuestions={questionsData.isSuccess} questions={moderationPosts ? questionsModeration : questions}/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </>
    )
}
