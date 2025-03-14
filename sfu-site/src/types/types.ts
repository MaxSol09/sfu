
export type TypePage = 'home' | 'about' | 'themes' | 'question'

export interface StatePage {
    page: TypePage,
    form: boolean,
    support: boolean,
    questionOpen: {
        open: boolean,
        link: string
    }
}


// ТИПЫ ДЛЯ AUTH.TS SLICE

export type Message = {
    text: string,
    fullName: string, 
    date: string,
    userID?: string,
    avatar?: string,
    status: string
}


export type UserData = {
    avatarUrl: string,
    backgroundProfile?: string,
    fullName: string,
    countSubs: number,
    createdAt: string,
    lastChat: Message[],
    email: string,
    text: string,
    updatedAt: string,
    __v: number,
    _id: string,
    token: string,
    chat: Message[],
    role: 'Студент' | 'Абитуриент',
    ban: boolean,
    banText: string,
    answer: number,
    speciality: string,
    complaints: Complaint[]
}

export type Complaint = {
    text: string,
    user: UserData,
    auther: UserData
}

export type StateAuth = {
    state: UserData | {},
    status: 'loading' | 'success' | 'errors' | 'none',
    vkAuth: {
        status: TypeStatus
    }, 
    user: {
        value: UserData | {},
        status: 'loading' | 'success' | 'errors'
    },
    userAvatar: {
        status: 'loading' | 'success' | 'errors' | 'none',
        img: {
            status: 'loading' | 'success' | 'errors' | 'none',
            value: string | null 
        }
    }
    userBackground: {
        status: 'none' | 'loading' | 'success' | 'errors',
        img: {
            status: 'none' | 'loading' | 'success' | 'errors',
            value: string | null
        }
    },
    subscribe: {
        status: 'none' | 'success'
    },
    complaintStatus: TypeStatus
}


// ТИПЫ ДЛЯ QUESTIONS.TS SLICE

export type TypeTags = {
    tag: string,
    id: string
  }

  export type TypeComment = {
    user: UserData,
    text: string,
    commentId: string
  }

  export type TypeChanell = {
    fullName: string,
    _id: string,
    imageUrl?: string
  }

  export type TypeLikes = {
    _id: string,
    fullName: string,
    email:string,
    date: string
  }

  export type TypeLike = {
    value:{} | TypeLikes,
    status: 'none' | 'like' | 'dislike'
  }   

  export type TypePost = {
    createdAt: string,
    updateAt: string,
    user: UserData,
    text: string,
    title: string,
    viewCount: number,
    __v: number,
    _id: string,
    tags: TypeTags[],
    comments: TypeComment[],
    likes: TypeLikes[],
    imageUrl?: string,
    moderation: boolean
  } 


  type TypeStatus = 'none' | 'success' | 'loading' | 'errors'

  export type TypeQuestions = { 
    questions: {
        items: [] | TypePost[]
        status: TypeStatus
    }
    questionsArr: {
        items: [] | TypePost[]
    },
    myQuestions: {
        items: [] | TypePost[],
        status: TypeStatus
    },
    myModerationQuestions: {
        items: [] | TypePost[],
        status: TypeStatus
    },
    favorite: TypePost[] | [],
    question: {
        items: {} | TypePost,
        status: TypeStatus
    },
    tags: {
        items: [] | TypeTags[],
        status: TypeStatus
    },   
    deleteQuestionStatus: {
        status: TypeStatus
    },
    createTag: {
        items: TypeTags[]
    },
    questionChanges: {
        status: 'none' | TypeStatus
    },
    commentCreate: {
        items: []
    },
    myAnswer: {
        value: TypePost[],
        status: TypeStatus
    },
    comments: [] | TypeComment[],
    commentCreateStatus: TypeStatus
  }