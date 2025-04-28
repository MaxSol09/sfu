import React from 'react'
import { Tags } from './Tags/Tags'
import { UserPanel } from './UserPanel'

export const Panel = () => {

  return (
      <aside className="fixed left-[100px] top-[110px] bottom-0 py-[20px] w-[17%] overflow-hidden max-[1130px]:hidden">
        <div className="flex flex-col gap-[20px]">
          <Tags />
          <UserPanel />
        </div>
      </aside>
  )
  
}
