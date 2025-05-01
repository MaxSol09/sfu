import { Button } from 'antd'
import {useState} from 'react'
import { DeleteBg } from '../Modals/DeleteBg'
import { isUser } from '../../utils/checkValue'
import { useParams } from 'react-router-dom'
import Delete from '../../images/delete.png'
import Sfu from '../../images/sfu-bg.webp'
import { useBackground } from '../../hooks/hooks'

export const Background = () => {

  const {id} = useParams()
  const [modalDeleteBg, setModalDeleteBg] = useState<boolean>(false)

  const {user, ref, changeBackground} = useBackground(id as string)

  return (
    <>
        {isUser(user) && <>
        <img alt='bg-image' className='w-full h-[200px] object-cover' src={user.backgroundProfile ? user.backgroundProfile : user.backgroundProfile ? user.backgroundProfile : Sfu}></img>
        <div className='absolute right-[15px] top-[15px] flex gap-[10px]'>
            <Button onClick={() => ref.current?.click()} >Смена фона</Button>
            <Button onClick={() => setModalDeleteBg(true)}>
                <img className='w-[25px]' alt='image-delete' src={Delete}></img>
            </Button>
        </div>
        <input onChange={e => changeBackground(e)} ref={ref} className='hidden' type='file' accept='image/*,.png,.jpg,.gif,.web'/>
        <DeleteBg modal={modalDeleteBg} setModal={setModalDeleteBg} id={id}/> </>}
    </>
  )
}
