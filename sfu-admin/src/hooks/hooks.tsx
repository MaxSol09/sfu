import { useMutation, useQuery } from "react-query"
import { usersService } from "../service/usersService"
import { useComplaintsStore } from "../zustand/complaints"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { isUser } from "../utils/checkValue"
import { useQuestionsStore } from "../zustand/questions"
import { questionsService } from "../service/questionsService"
import { useUserStore } from "../zustand/auth"
import { Message, UserData } from "../types/types"


export const useGetComplaints = () => {

    const getComplaints = useComplaintsStore(el => el.getComplaints)

    const complaints = useComplaintsStore(el => el.complaints.items)
    const status = useComplaintsStore(el => el.complaints.status)

    const {isLoading, isSuccess, data} = useQuery({
        queryKey: ['complaintsGet'],
        queryFn: usersService.getAllComplaints,
        select: data => data.data
    })

    useEffect(() => {
    if(isSuccess){
        getComplaints(status === 'success' ? complaints : data)
    }
    }, [isSuccess])

    return {
        complaints,
        isLoading
    }
}


export const useUserProfile = (id: string) => {

    const user = useUserStore(el => el.user.value)

    const {getMyAnswer, getMyFavorite, getMyQuestions, getAllQuestions} = useQuestionsStore(el => el)

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: ['questionsKEY'],
        queryFn: questionsService.getQuestions,
        select: data => data.data
    })
        
    useEffect(() => {
        if(isSuccess){
            getAllQuestions(data)
        }
    }, [isSuccess])
    
    useEffect(() => {
        if(isSuccess && isUser(user)){
        getMyFavorite(user._id)
        if(user.role === 'Студент'){
            console.log(5)
            getMyAnswer(user._id)
        }
        else{
            getMyQuestions(user._id)
        }
        }
    }, [isSuccess, user, id])

  return {
    user,
    isLoading,
    isSuccess,
    questionsData: data
  }
}


export const useTextSize = (user: UserData | {}) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [textWidth, setTextWidth] = useState(0);
    
    useEffect(() => {
        if (textRef.current) {
        setTextWidth(textRef.current.offsetWidth)
    }
    }, [user])
    
    const isTextLessThan140 = textWidth < 140;

    return {isTextLessThan140, textRef}
}


export const useChangeSpeciality = (id: string) => {

    const {changeStudentSpeciality} = useUserStore(el => el)

    const mutateSpeciality = useMutation(usersService.changeUserSpeciality, {
        mutationKey: ['changeSpeciality', id]
    })

    useEffect(() => {
        if(mutateSpeciality.isSuccess){
            changeStudentSpeciality(mutateSpeciality.data.data.speciality)
        }
    }, [mutateSpeciality.isSuccess])
    
    return mutateSpeciality.data
}

export const useEditSpeciality = (id: string) => {
    
    const user = useUserStore(el => el.user.value)

    const [speciality, setSpeciality] = useState<string>('')
    const [changeSpeciality, setChangeSpeciality] = useState<boolean>(false)

    const {changeStudentSpeciality} = useUserStore(el => el)

    const mutateSpeciality = useMutation(usersService.changeUserSpeciality, {
        mutationKey: ['changeSpeciality', id]
    })

    useEffect(() => {
        if(mutateSpeciality.isSuccess){
            changeStudentSpeciality(mutateSpeciality.data.data.speciality)
        }
    }, [mutateSpeciality.isSuccess])

    const handleSpeciality = () => {
        if(!speciality) return 

        if(isUser(user)){
            mutateSpeciality.mutate({userID: user._id, speciality: speciality})
        }

        setChangeSpeciality(false)
    }

    return {
        handleSpeciality,
        setSpeciality,
        setChangeSpeciality,
        changeSpeciality,
        user
    }
}


export const useGetUser = (id: string) => {

    const getUserFn = useUserStore(el => el.getUser)

    const {data, isSuccess} = useQuery({
        queryFn: () => usersService.getUser(id),
        queryKey: ['getUser', id],
        select: (data) => data.data
    })

    console.log('user render')

    useEffect(() => {
        if(isSuccess){
            getUserFn(data)
        }
    }, [isSuccess])

    return data
}

export const useFindQuestion = (isModerationQuestions: boolean) => {
    const [title, setTitle] = useState<string>('')

    const searchQuestions = useQuestionsStore(el => el.searchQuestion)

    useEffect(() => {
        if(title.length){
            setTimeout(() => {
                searchQuestions(title, isModerationQuestions)
            }, 300)
        }
    }, [title])

    return {setTitle}
}


export const useGetQuestion = (id: string) => {
    const getQuestionFn = useQuestionsStore(el => el.getQuestion)

    const {data, isSuccess, isLoading} = useQuery({
      queryFn: () => questionsService.getQuestion(id as string),
      queryKey: ['getQuestion', id],
      select: data => data.data
    })
  
    useEffect(() => {
      if(isSuccess){
        getQuestionFn(data)
      }
    }, [isSuccess])

    return {isLoading}
}


export const useAvatar = (id: string) => {
    const sendAvatar = useUserStore(el => el.sendAvatar)

    const user = useUserStore(el => el.user.value)
  
    const mutateChangeAvatar = useMutation(usersService.changeAvatar, {
      mutationKey: ['changeAvatarkey', id]
    })
  
    const [previousValuePath, setPreviousValuePath] = useState<null | string>(null);
    const value = useUserStore(el => el.userAvatar.value)
  
    useEffect(() => {
        if (value !== null && value !== previousValuePath && isUser(user)) {
            console.log(value)
            mutateChangeAvatar.mutate({ id: user._id, avatar: value });
  
            setPreviousValuePath(value);
        }
    }, [value, previousValuePath, user]) 
  
    const mutateSendAvatar = useMutation(usersService.sendAvatar, {
      mutationKey: ['sendAvatar']
    })
  
    useEffect(() => {
      if(mutateSendAvatar.isSuccess){
        console.log('qwqgwv')
        sendAvatar(mutateSendAvatar.data.data.path)
      }
    }, [mutateSendAvatar.isSuccess])
  
    const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      const input = e.target as HTMLInputElement;
    
      if (!input.files || input.files.length === 0) {
        console.log('Загрузите, пожалуйста, картинку');
        return;
      }
    
      const file = input.files[0]; // Получаем первый файл из объекта
    
      // Замените `object` на `FormData`
      const formData = new FormData();
      formData.append('file', file); // Добавляем файл, а не input
  
      mutateSendAvatar.mutate((formData));
  
    }

    return {changeAvatar, user, changeLoading: mutateChangeAvatar.isLoading, sendLoading: mutateSendAvatar.isLoading}
}



export const useGetMe = () => {
    const getMeFn = useUserStore(el => el.getMe)
  
    const {isSuccess, isError, isLoading, data, refetch} = useQuery({
      queryKey: ['userKey'],
      select: data =>  data.data,
      queryFn: usersService.getMe
    })
  
    console.log(isLoading)
  
    useEffect(() => {
      if(isSuccess){
        getMeFn(data)
      }
    }, [isLoading, isSuccess])


    return {isLoading, isError, data, isSuccess, refetch}
}


export const useBackground = (id: string) => {

    const sendBg = useUserStore(el => el.sendBg)
    const user = useUserStore(el => el.user.value)

    const mutateBacground = useMutation(usersService.changeBackground, {
      mutationKey: ['changeBgKey', id]
    })
  
    const mutateSendBackground = useMutation(usersService.sendBackground, {
      mutationKey: ['sendBgKey']
    })
  
    useEffect(() => {
      if(mutateSendBackground.isSuccess){
        sendBg(mutateSendBackground.data.data.path)
      }
    }, [mutateSendBackground.isSuccess])

    const bgRef = useRef<HTMLInputElement | null>(null)
  
    const bgValue = useUserStore(el => el.userBackground.value)
  
    const [bgPath, setBgPath] = useState<string | null>(null)

  
    useEffect(() => {
        if (bgValue !== bgPath && bgValue !== null && isUser(user)) { //в данной строчке проверяю что имя картинки не равно той на которую мы меняли в прошлый раз
          console.log('egeew')
          mutateBacground.mutate({ id: user._id, backgroundProfile: bgValue }); //меняю задний фон у определенного юзера
    
          setBgPath(bgValue)
        }
        else{
          return
        }
  
    }, [user, bgValue, bgPath]); 

    const changeBg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        
        if (!input.files || input.files.length === 0) {
          console.log('Загрузите, пожалуйста, картинку');
          return;
        }
      
        const file = input.files[0]; // Получаем первый файл из объекта
  
      
        // Замените `object` на `FormData`
        const formData = new FormData();
        formData.append('file', file); // Добавляем файл, а не input
      
        mutateSendBackground.mutate((formData)); //отправка картинки на сервер
    }


    return {ref: bgRef, user, changeBackground: changeBg,}

}

export const useGetQuestions = () => {

    const questionsArr = useQuestionsStore(el => el.questionsArr.items) 
    const getAllQuestions = useQuestionsStore(el => el.getAllQuestions)

    const [isModerationQuestions, setIsModerationQuestions] = useState<boolean>(false)

    const {isSuccess, data} = useQuery({
        queryKey: ['questionsKEY'],
        queryFn: questionsService.getQuestions,
        select: data => data.data
    })

    useEffect(() => {
        if(isSuccess){
            getAllQuestions(data)
        }
    }, [isSuccess])


    const clickTabs = (moderation: boolean) => {
        setIsModerationQuestions(moderation)
        getAllQuestions(questionsArr.length ? questionsArr : data)
    }

    return {clickTabs, isModerationQuestions, isSuccess}
} 


export const useGetUsers = () => {

    const users = useUserStore(el => el.users)
    const usersArr = useUserStore(el => el.usersArr)

    const [students, setStudents] = useState<[] | UserData[]>([])
    const [applicants, setApplicants] = useState<[] | UserData[]>([])
    const {getUsers} = useUserStore(el => el)

    const {data} = useQuery({
        queryKey: ['usersKey'],
        queryFn:  usersService.getAllUsers,
        select: data => data.data
    })

    useEffect(() => {
        if(data){
            getUsers(data)
        }
    }, [data])

    useEffect(() => {
        if(usersArr.length){
            setStudents(usersArr.filter(el => el.role === 'Студент'))
            setApplicants(usersArr.filter(el => el.role === 'Абитуриент'))
        }
    }, [usersArr, users])

    return {students, applicants, users, usersArr}
} 




export const useChangeUser = (user: UserData) => {
    const [banId, setBanId] = useState<string>('')
    const [modalBan, setModalBan] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')

    const [modalRole, setModalRole] = useState<boolean>(false)

    const openDeleteModalFn = (id: string) => {
        setDeleteId(id)
        setModalDelete(true)
    }

    const openBanModal = (id: string) => {
        setModalBan(true)
        setBanId(id)
    }

    const [userID, setUserID] = useState<string>('')
    const [role, setRole] = useState<'Админ' | 'Студент' | 'Абитуриент'>(user.role)

    const handleChange = (value: 'Админ' | 'Студент' | 'Абитуриент') => {
        if(value !== userID){
            console.log(userID)
            setRole(value)
            setModalRole(true)
        }
    };

    useEffect(() => {
        setUserID(user._id)
    }, [user])


    return {
        handleChange,
        openBan: openBanModal,
        openDelete: openDeleteModalFn,
        modalRole,
        modalBan,
        modalDelete,
        role,
        banId,
        deleteId,
        userID,
        setDeleteId,
        setModalBan,
        setModalRole,
        setModalDelete
    }
}



export const useChangeText = (setChangeText: any) => {
    const [text, setText] = useState<string>('')
    
    const user = useUserStore(el => el.user.value)
    
    const {getUser} = useUserStore(el => el)

    useEffect(() => {
        if(isUser(user)){
            setText(user.text)
        }
    }, [user])

    const mutateText = useMutation(usersService.changeTextFun, {
        mutationKey: ['changeText']
    })

    useEffect(() => {
        console.log(mutateText.data)
        if(mutateText.isSuccess){
            getUser(mutateText.data.data)
        }
    }, [mutateText.isSuccess])

    const submit = () => {
        if(!text || text.length > 300 || (isUser(user) && text === user.text)) return 
        
        if(isUser(user)){
            mutateText.mutate({userID: user._id, text}) // меняем данные пользователя
            setChangeText(false)
        }

        setChangeText(false)
    }
    
    return {
        submit,
        text, 
        setText
    }
}


export const useSiderWidth = () => {

    const [siderWidth, setSiderWidth] = useState(0);
    const siderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const measureSider = () => {
            if (siderRef.current) {
                setSiderWidth(siderRef.current.offsetWidth);
            }
        };

        measureSider();
        window.addEventListener('resize', measureSider);

        return () => window.removeEventListener('resize', measureSider);
    }, []);


    return {siderWidth, siderRef}
}


export const useGetChats = () => {
    const {getMessages, getUsers, messagesArr} = useUserStore(el => el)

    const {isSuccess, data, isLoading} = useQuery({
        queryKey: ['usersKey'],
        queryFn:  usersService.getAllUsers,
        select: data => data.data
    })

    useEffect(() => {
        if(isSuccess){
            getUsers(data)
            getMessages(data)
        }
    }, [isSuccess])


    return {messagesArr, isSuccess, isLoading}
}


export const useSendMessage = () => {

    const [text, setText] = useState<string>('')

    const selectChat = useUserStore(el => el.selectChat)

    const {mutate, isLoading} = useMutation(usersService.sendMessage, {
        mutationKey: ['sendMessage', selectChat.id]
    })

    const sendMessageFn = (e: any) => {

        e.preventDefault()

        if(text && !isLoading){
            mutate({userID: selectChat.id, status: 'admin', text})
            setText('')
        }
    }


    return {
        text,
        setText,
        sendMessage: sendMessageFn,
        isLoading
    }
}


export const useTopMessage = ( messages: Message[]) => {
    const messageRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [messages])

    return {messageRef}
}


export const useDeleteComplaint = (idUser: string, autherId: string) => {
    const deleteComplaintFn = useComplaintsStore(el => el.deleteComplaint)

    const mutateDeleteComplaint = useMutation(usersService.deleteComplaint, {
      mutationKey: ['deleteComplaint', idUser, autherId]
    })
  
    useEffect(() => {
      if(mutateDeleteComplaint.isSuccess){
        deleteComplaintFn(mutateDeleteComplaint.data.data)
      }
    }, [mutateDeleteComplaint.isSuccess])
  
    const deleteComplaint = (userID: string, autherID: string) => {
      mutateDeleteComplaint.mutate({userID, autherID})
    }

    return {deleteComplaint}
}



export const useChangeRole = (setModal: any) => {
    const {isSuccess, mutate} = useMutation(usersService.changeUserRole, {
        mutationKey: ['changeRole']
    })

    useEffect(() => {
        if(isSuccess){
            setModal(false)
        }
    }, [isSuccess])

    return {mutate}
}


export const useDeleteAvatar = (setModal: any) => {

    const user = useUserStore(el => el.user.value)

    const sendAvatar = useUserStore(el => el.sendAvatar)

    const {isSuccess, mutate} = useMutation(usersService.changeAvatar, {
    mutationKey: ['deleteAvatarModal']
    })

    useEffect(() => {
    if(isSuccess){
        console.log('qwqgwv')
        sendAvatar('')
    }
    }, [isSuccess])

    const deleteAvatar = () => {
        if(isUser(user)){
            mutate({id: user._id, avatar: ''})
            setModal(false)
        }
    }

    return {mutate, deleteAvatar}
} 


export const useDeleteBackground = (setModal: any, id: string) => {
    const user = useUserStore(el => el.user.value)

    const sendBg = useUserStore(el => el.sendBg)

    const mutateBackground = useMutation(usersService.changeBackground, {
        mutationKey: ['changeBgDelete446', id]
    })

    useEffect(() => {
        if(mutateBackground.isSuccess){
            sendBg('')
        }
    }, [mutateBackground.isSuccess])
    

    const deleteBackground = () => {
        if(!isUser(user)) return
    
        mutateBackground.mutate({ id: user._id, backgroundProfile: '' }); //меняю задний фон у определенного юзера
          
        setModal(false)
    }

    return {deleteBackground}
}


export const useDeleteQuestion = (setModal: any, postId: string, setPostId: any) => {
    const mutateDelete = useMutation(questionsService.deleteQuestion, {
        mutationKey: ['deleteQuestion']
    })

    const deleteFn = () => {
        mutateDelete.mutate(postId)
        setModal(false)
        }

    useEffect(() => {
        if(mutateDelete.isSuccess){
            setPostId('')
        }
    }, [mutateDelete.isSuccess])

    return {deleteQuestion: deleteFn}
}

export const useDeleteUser = (setModal: any, setDeleteId: any, deleteId: string) => {
    const mutateDelete = useMutation(usersService.deleteUser, {
        mutationKey: ['deleteUser']
    })

    const deleteUserFn = () => {
        mutateDelete.mutate(deleteId)
        setModal(false)
        setDeleteId('')
    }

    return {deleteUser: deleteUserFn}
}

export const useBan = (setModal: any, userID: string, autherID: string, page: string) => {
    const [text, setText] = useState<string>('')

    const mutateDeleteComplaint = useMutation(usersService.deleteComplaint, {
        mutationKey: ['deleteComplaint', userID, autherID]
    })

    const mutateBan = useMutation(usersService.banUser, {
        mutationKey: ['banUser']
    })

    const deleteComplaintFn = useComplaintsStore(el => el.deleteComplaint)


    const banUser = (type: 'ban' | 'unban') => {
        if(type === 'unban'){
            mutateBan.mutate({userID, type})
        }
        else{
            mutateBan.mutate({userID, text, type})
            mutateDeleteComplaint.mutate({userID, autherID})
        }
    }

    useEffect(() => {
        if(mutateDeleteComplaint.isSuccess){
            deleteComplaintFn(mutateDeleteComplaint.data.data)
        }
    }, [mutateDeleteComplaint.isSuccess])

    const deleteComplaint = useComplaintsStore(el => el.deleteComplaint)

    
    useEffect(() => {
        if(mutateBan.isSuccess){
            setModal(false)
            
            if(page === 'ban'){
                deleteComplaint({userID, autherID})
            }
        }
    }, [mutateBan.isSuccess])

    return {banUser, setText}
}


export const useCreateUser = (setModal: any, role: 'Студент' | 'Абитуриент' | 'Админ') => {
    const [speciality, setSpeciality] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')

    const addUser = useUserStore(el => el.addUser)

    const {mutate, isSuccess, data} = useMutation(usersService.registerUser, {
        mutationKey: ['register']
    })

    useEffect(() => {
        if(isSuccess){
            addUser(data.data)
            setModal(false)
        }
    }, [isSuccess])

    const createUser = () => {
        if(!fullName || !email || (role === 'Админ' && password.length < 6)){
            return alert('Заполни поля')
        }
        
        mutate({
            fullName,
            speciality,
            email,
            role,
            password
        })
    }
    
    return {
        createUser,
        setEmail,
        setFullName,
        setSpeciality,
        setPassword
    }
}


export const useModerationQuestion = () => {
    const {mutate, data, isSuccess} = useMutation(questionsService.moderationQuestion, {
        mutationKey: ['mutateModeration']
    })

    const moderationQuestion = useQuestionsStore(el => el.moderationQuestion)

    useEffect(() => {
        if(isSuccess){
            moderationQuestion(data.data)
        }
    }, [isSuccess])

    return {mutate, data, isSuccess}
}