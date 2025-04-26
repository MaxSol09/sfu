import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { isUser } from '../../../utils/checkValue'
import { Skeleton } from 'antd'
import * as Progress from "@radix-ui/react-progress";
import { Tooltip } from '@mui/joy';
import { getAnswerEnding } from '../../../utils/getAnswerEnding';
import { Achievement } from './Achievement';

export const Achievements: React.FC = () => {

    const [progress, setProgress] = useState<number>(0)
    const user = useAppSelector(el => el.auth.user.value)

    const [nextCount, setNextCount] = useState<number>(0)
    const [lastCount, setLastCount] = useState(0)

    const achievements = [
        {
            count: 5,
            id: 1,
            title: `достижение за ответы на 5 вопросов`
        },
        {
            count: 25,
            id: 2,
            title: `достижение за ответы на 25 вопросов`
        },
        {
            count: 50,
            id: 3,
            title: `достижение за ответы на 50 вопросов`
        },
        {
            count: 100,
            id: 4,
            title: `достижение за ответы на 100 вопросов`
        },
        {
            count: 500,
            id: 5,
            title: `достижение за ответы на 500 вопросов`
        },
        {
            count: 1000,
            id: 6,
            title: `достижение за ответы на 1000 вопросов`
        }
    ]

    //функция которая возвращает нужное склонение слова пользователь

    useEffect(() => {

        if(isUser(user) && user.role === 'Студент'){
            const notAchievments = achievements.filter(el => el.count > user.answer)
        
            if(notAchievments.length){

                const next = notAchievments[0]
                const last = achievements.find(el => el.id === next.id - 1)

                setNextCount(next.count)

                if(last?.count){
                    setLastCount(last.count)
                }

                const timer = setTimeout(() => setProgress(user.answer / next.count * 100), 400)
                return () => clearTimeout(timer)
            }
        }

	}, [achievements, user]);


  return (
    <div className='grid gap-[30px]'>
        { isUser(user) ?
        <div className='bg-slate-100 px-[30px] py-[20px]'>
            <p className='text-gray-600'>
                Достижения
            </p>
            <div className='grid grid-cols-2 gap-[20px] pt-[15px]'>
                {isUser(user) && achievements.map(a => (
                    <Achievement a={a}/>
                ))}
            </div>
        </div>
        : <Skeleton title={false} paragraph={{rows: 3}}></Skeleton>}   
        {isUser(user) && user.role === 'Студент' && 
        <div className='bg-slate-100 px-[30px] pb-[20px] flex flex-col items-center'>
            <h1 className='text-center pt-[10px] pb-[20px]'>Прогресс ответов</h1>
            <Tooltip title={<span style={{ whiteSpace: 'pre-line'}}>{`до следующего достижения \n осталось ${getAnswerEnding(nextCount - user.answer)} `}</span>}>
                <Progress.Root className="ProgressRoot" value={progress}>
                    <Progress.Indicator
                        className="ProgressIndicator"
                        style={{ transform: `translateX(-${100 - progress}%)` }}
                    />
                </Progress.Root>
            </Tooltip>
            <div className='flex justify-between w-[90%]'>
                <p>{lastCount}</p>
                <p>{nextCount}</p>
            </div>
        </div> }
    </div>
  )
}
