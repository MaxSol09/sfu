export type TypeStatus = 'none' | 'loading' | 'success' | 'errors'


//типы для users

export type Message = {
    text: string,
    fullName: string, 
    userID: string,
    avatar?: string,
    status: string,
    date: string
}

export type Messages = {
  fullName: string,
  userID: string,
  avatar: string,
  chat: Message[]
}


export type MessageSubmit = {
  text: string,
  userID: string,
  status: 'user' | 'admin'
}

export type UserData = {
    avatarUrl: string,
    backgroundProfile?: string,
    fullName: string,
    countSubs: number,
    createdAt: string,
    email: string,
    text: string,
    updatedAt: string,
    __v: number,
    _id: string,
    token: string,
    chat: Message[],
    role: 'Студент' | 'Абитуриент' | 'Админ',
    ban: boolean,
    speciality: Array<string>,
    banText: string,
    favorite: [],
    answer: number,
    complaints: Complaint[]
}

export type Complaint = {
  text: string,
  user: UserData,
  auther: UserData,
  date: string
}


// ТИПЫ ДЛЯ QUESTIONS

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
    email:string
  }

  export type TypeLike = {
    value:{} | TypeLikes,
    status: 'none' | 'like' | 'dislike'
  }   

  export type TypePost = {
    createdAt: string,
    moderation: boolean,
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
    imageUrl?: string
  } 

  