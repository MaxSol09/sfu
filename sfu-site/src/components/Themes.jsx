import React from 'react'
import Land from '../images/land.png'
import Eyes from '../images/eyes.svg'
import Comment from '../images/comment.svg'
import {Button} from 'antd'

import { useAppSelector } from '../redux/hooks.ts'

export const Themes = () => {
    const {page} = useAppSelector(el => el.page)

    console.log(page)

    return (
        <div style={{display: page === 'themes' ? 'grid' : 'none'}}>
            <div className='flex justify-between items-center px-[45px]'>
                <div className='w-[500px] space-y-[3px]'>
                <h1 className='text-[20px] leading-6'>Обсуждение</h1>
                </div>
                <Button className='ml-[10px] text-[17px]'>Создать тему</Button>
            </div>
            <div className='flex items-center px-[45px] justify-between pt-[20px]'>
                <h1 className='text-[18px]'>Обсуждения: 100 тем</h1>
                <div className='flex gap-[20px]'>
                    <h1 className='text-[20px]'>Категории:</h1>
                    <Button>Популярные</Button>
                    <Button>Новые</Button>
                    <Button>Старые</Button>
                    <Button>Все</Button>
                </div>
            </div>
            <div className='grid w-full place-items-center m-auto pt-[20px] pb-[100px] gap-[30px]'>
        <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
            <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
            <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
            <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
            <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
            <div className='bg-gray-200 py-[10px] px-[15px] w-[90%] grid rounded-md'>
              <h1 className='text-[22px]'>Какую кафедру лучше всего выбрать?</h1>
              <p className='line-clamp-2'>Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript Поступаю в ЮФУ и очень люблю прогать на javascript</p>
              <div className='flex items-end justify-between py-[5px] pt-[10px]'>
                <div className='flex gap-[20px]'>
                  <div className='flex gap-[5px]'>
                    <img src={Eyes} alt="просмотры" />
                    <p>29</p>
                  </div>
                  <div className='items-center flex gap-[5px]'>
                    <img src={Comment} alt="глаза" />
                    <p>5</p>
                  </div>
                </div>
                <Button style={{
                  color: 'white',
                  backgroundColor: '#4CAF50', // Default background color
                  borderColor: '#4CAF50',     // Default border color
                  ':hover': {                  // Hover styles
                    backgroundColor: '#388E3D',
                    borderColor: '#388E3D',
                  },
                  ':active': {                 // Active (pressed) styles
                    backgroundColor: '#2E682C',
                    borderColor: '#2E682C',
                  },
                }}   
                   >Ответить</Button>
              </div>
            </div>
        </div>
        </div>
    )
}
