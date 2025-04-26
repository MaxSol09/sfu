import { useAppDispatch } from "../redux/hooks"
import { searchQuestion } from "../redux/questions"

export const useFindQuestion = (val: string) => {
    const dispatch = useAppDispatch()

    if(!val) return 

    setTimeout(() => {
        dispatch(searchQuestion({title: val}))
    }, 300)

    return val
}