import React from 'react'
import User from '../images/user.jpg'

export const Panel = () => {
  return (
    <div className='grid fixed left-[100px] top-[110px] py-[20px] gap-[20px]'>
        <div className='bg-slate-100 py-[15px] pl-[20px] text-[17px]'>
            <h1 className='text-[18px] mb-[10px]'>Популярные тэги</h1>
            <p>#стипендия</p>
            <p>#поступление</p>
            <p>#баллы</p>
            <p>#кафедры</p>
            <p>#мероприятия</p>
        </div>
        <div className='bg-slate-100 py-[20px] px-[100px] grid justify-center items-center text-center'>
            <img className='w-[170px] rounded-full' src={User} alt="аватарка" />
            <p className='pt-[10px] text-[20px]'>Максим Сологор</p>
        </div>
        <button className='bg-slate-100 py-[10px] shadow-btn-shadow'>Профиль</button>
    </div>
  )
}
