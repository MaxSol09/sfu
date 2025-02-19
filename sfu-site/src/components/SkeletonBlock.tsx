import { Skeleton } from 'antd'

export const SkeletonBlock: React.FC = () => {
  return (
    <div className='grid gap-[50px]'>
        <div className='bg-slate-100 px-[30px] py-[20px] '>
            <Skeleton active paragraph={{rows: 6}} title={false}></Skeleton>  
        </div>
    </div>
  )
}
