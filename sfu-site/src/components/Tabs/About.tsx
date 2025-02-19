import React from 'react'
import { Header } from '../Header/Header'
import { Panel } from '../Panels/Panel'
import { Chat } from '../Chat/Chat'

export const About: React.FC = () => {

  return (
    <>
      <Header currPage={'about'}/>
      <Panel />
      <main className='ml-[23%] pt-[130px] gap-[20px] px-[80px]'>
          <h1 className='text-[28px]'>Об институте</h1>
          <div className='text-[18px] pr-[50px]'>
            <p className=' pt-[20px] w-6/7'>ИКТИБ - институт компьютерных технологий и информационной безопасности был образован в декабре 2013 года путем объединения Факультета автоматики и вычислительной техники, Факультета информационной безопасности, кафедры высшей математики Факультета естественнонаучного и гуманитарного образования и Научно-технического центра «Интех». В настоящее время в состав института входят 12 кафедр, в том числе одна базовая кафедра ООО «НИЦ супер-ЭВМ и нейрокомпьютеров», два научных подразделения, студенческое конструкторское бюро, проектный офис, редакция научно-технического журнала «Известия ЮФУ. Технические науки», два международных научных центра, научно-образовательные центры и научно-исследовательские лаборатории.</p>
            <p className='pt-[20px]'>
                Реализуемые в Институте инновационные подходы к образовательному процессу, внедрение технологий проектного обучения, практико-ориентированной подготовки, налаженное тесное взаимодействие с представителями ИТ-отрасли позволили вывести Южный федеральный университет в число лидеров по подготовке ИТ-специалистов. Так, по результатам опроса руководителей ИТ-компаний Ассоциацией РУССОФТ в 2020 году Южный федеральный университет вошел в 10 университетов России, подготавливающих лучших ИТ-специалистов. При этом в рейтинге РУССОФТ российских университетов по качеству подготовки, построенному на базе оценок работодателей, Южный федеральный университет в 2023 году занял 4 место. А по итогам исследования АНО «Цифровая экономика», проведенного при поддержке Минцифры РФ и Ассоциации предприятий компьютерных и информационных технологий в 2024 году, Южный федеральный университет занимает 7 позицию среди региональных вузов, осуществляющих подготовку по ИТ-направлениям
            </p>
          </div>
      </main>
      <Chat />
    </>
  )
}
