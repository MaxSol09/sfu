import React from 'react'
import { useQuestionsStore } from '../zustand/questions'
import { Panel } from '../components/Panel'
import { Posts } from '../components/Posts/Posts'
import { FilterQuestions } from '../components/Questions/FilterQuestions'
import { SearchQuestions } from '../components/Questions/SearchQuestions'
import { useGetQuestions } from '../hooks/hooks'
import { LayoutPage } from '../components/Layout'

export const Questions: React.FC = () => {

    const questions = useQuestionsStore(el => el.questions.items)
    const questionsModeration = useQuestionsStore(el => el.questionsModeration.items)

    const {isModerationQuestions, clickTabs, isSuccess} = useGetQuestions()

    return (
        <LayoutPage sider={<Panel currPage='questions'/>} content={
            <div className='overflow-auto h-[100vh]'>
                <div className='grid w-4/5 m-auto'>
                    <div className='flex justify-between items-center mt-[20px] flex-wrap break-all'>
                        <div className='flex justify-center gap-[30px] text-[18px] cursor-pointer'>
                            <p onClick={() => clickTabs(false)} className={`${!isModerationQuestions && 'underline'}`}>Опубликованные</p>
                            <p onClick={() => clickTabs(true)} className={`${isModerationQuestions && 'underline'}`}>На модерации</p>
                        </div>
                        <SearchQuestions isModerationQuestions={isModerationQuestions}/>
                    </div>
                    <div className='flex items-center justify-between pt-[20px]'>
                        <h1 className='text-[18px]'>Всего вопросов: {isModerationQuestions ? questionsModeration.length : questions.length}</h1>
                        <FilterQuestions />
                    </div>
                    <Posts loadingQuestions={isSuccess} questions={isModerationQuestions ? questionsModeration : questions}/>
                </div>
            </div>}
        />
    )
}
