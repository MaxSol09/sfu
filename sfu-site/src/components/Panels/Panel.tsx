import React from 'react'
import { Tags } from './Tags/Tags'
import { UserPanel } from './UserPanel'

export const Panel = () => {

  console.log('panel render')

  return (
      <aside className="fixed left-[100px] top-[110px] bottom-0 py-[20px] w-[17%] overflow-hidden">
        <div className="flex flex-col gap-[20px]">
          <Tags />
          <UserPanel />
        </div>
      </aside>
  )
}
