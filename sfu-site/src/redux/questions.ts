import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { TypePost, TypeQuestions, TypeTags } from "../types/types"
import { API_ENDPOINTS } from "../api/endpoints"


export const fetchQuestions = createAsyncThunk('fetch/posts', async() => {
    const {data} = await axios.get(API_ENDPOINTS.QUESTIONS.GET_QUESTIONS)

    return data
})

export const fetchTags = createAsyncThunk('tags/posts', async() => {
    const {data} = await axios.get(API_ENDPOINTS.QUESTIONS.GET_TAGS)

    console.log(data)

    return data
})

type SubmitType = {
    title: string, 
    text: string, 
    tags: TypeTags[],
    userId: string
  }

export const createQuestion = createAsyncThunk('fetch/postCreate', async(postData: SubmitType) => {
    console.log(postData)

    console.log(API_ENDPOINTS.QUESTIONS.CREATE_QUESTION)

    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.CREATE_QUESTION, postData)

    return data
})

export const sendImg = createAsyncThunk( 'img/fetch', async (formData: object) => {

    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.UPLOAD, formData)

    return data
})


export const deleteQuestion = createAsyncThunk('delete/Post', async (id: string) => {
    
    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.DELETE_QUESTION, {id})

    return data
}
)

export const getQuestion = createAsyncThunk(
    'getPost/fetch',
    async (id: string) => {

        const {data} = await axios.get(`${API_ENDPOINTS.QUESTIONS.GET_QUESTION}/${id}`)

        return data
    }
)

interface TypeCommentData {
    postId: string,
    fullName: string,
    text: string,
    commentId: string,
    avatar?: string,
    user: string,
}

export const createComment = createAsyncThunk('createComment/fetch', async (commentData: TypeCommentData) => {

    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.CREATE_COMMENT, commentData)

    return data.comments
})

interface TypeRemoveComment {
    postId: string, 
    commentId: string
}

export const deleteComment = createAsyncThunk('delete/comment', async (commentData: TypeRemoveComment) => {
    console.log(commentData)

    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.DELETE_COMMENT, commentData)

    return data
})


export const createLike = createAsyncThunk('create/like', async(dataLike: {postID: string, fullName: string, userID: string}) => {
    console.log(dataLike)

    const {data} = await axios.post(API_ENDPOINTS.QUESTIONS.CREATE_LIKE, dataLike)

    return data
})




const initialState: TypeQuestions = {
    questions: {
        items: [],
        status: 'loading'
    },
    questionsArr: {
        items: [] 
    },
    myQuestions: {
        items: [],
        status: 'loading'
    },
    myModerationQuestions: {
        items: [],
        status: 'loading'
    },
    myAnswer: {
        value: [],
        status: 'none'
    },
    favorite: [],
    question: {
        items: {},
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    deleteQuestionStatus: {
        status: 'loading'
    },
    createTag: {
        items: []
    },
    questionChanges: {
        status: 'none'
    },
    commentCreate: {
        items: []
    },
    comments: [],
    commentCreateStatus: 'none'
}



const questionsSlice = createSlice({
    name: 'questions/slice',
    initialState,
    reducers: {
        createTag: (state, action) => {
            state.createTag.items = [...state.createTag.items, action.payload]
        },
        deleteTag: (state, action) => {
            state.createTag.items = state.createTag.items.filter(el => el.id !== action.payload)
        },
        resetUserPosts: (state) => {
            state.favorite = []
            state.myAnswer.value = []
            state.myQuestions.items = []
        },
        getMyQuestions: (state, action) => {
            state.myQuestions.items = state.questions.items.filter(el => {
                if(el.user === null) return null
                 
                return el.user._id === action.payload.id && el.moderation === true
            })
            

            state.myQuestions.status = 'success'
        },
        getMyModerationQuestions: (state, action) => {

            state.myModerationQuestions.items = state.questions.items.filter(el => {
                if(el.user === null) return null
                 
                return el.user._id === action.payload.id && el.moderation === false
            })
            

            state.myModerationQuestions.status = 'success'
        },
        getMyAnswer: (state, action) => {

            console.log(action.payload)

            state.myAnswer.value = state.questionsArr.items.filter(el => {
                return el.comments.some(i => i.user === action.payload.id)
            })
            
        },
        getMyFavorite: (state, action) => {
            const userId = action.payload.id; // Получаем ID текущего пользователя

            // 1. Фильтруем посты, где есть лайк от текущего пользователя
            const filteredPosts = state.questions.items.filter(el =>
                el.likes.some(like => like._id === userId)
            );
        
            // 2. Сортируем отфильтрованные посты по дате последнего лайка пользователя
            const sortedPosts = filteredPosts.sort((a, b) => {
                // Находим лайк текущего пользователя в каждом посте (или null, если его нет)
                const userLikeA = a.likes.find(like => like._id === userId);
                const userLikeB = b.likes.find(like => like._id === userId);
        
                // Если лайка нет, оставляем порядок без изменений
                 if (!userLikeA) return 1;
                 if (!userLikeB) return -1;
        
                // Преобразуем даты лайков в таймстемпы
                const dateA = new Date(userLikeA.date).getTime();
                const dateB = new Date(userLikeB.date).getTime();
        
                // Сортируем от новых к старым
                return dateB - dateA;
            });
        
            state.favorite = sortedPosts;
        },
        getQuestionPage: (state, action) => {

            const result = state.questions.items.filter(el => el._id === action.payload.id)
        
            state.question.items = result
            state.comments = result[0].comments

        },
        resetPost: (state) => {
            state.question.items = {} as TypePost
        },
        resetPostStatus: (state) => {
            state.questionChanges.status = 'none'
        },
        popularQuestions: (state) => {
           state.questionsArr.items = state.questionsArr.items.sort((a, b) => b.likes.length - a.likes.length) 
        },
        newQuestion: (state) => {
            state.questionsArr.items = state.questionsArr.items.sort((a, b) => {
                let c = new Date(a.createdAt).getTime();
                let d = new Date(b.createdAt).getTime();
                return d-c;
            });
        },
        oldQuestions: (state) => {
            state.questionsArr.items = state.questionsArr.items.sort((a, b) => {
                let c = new Date(a.createdAt).getTime();
                let d = new Date(b.createdAt).getTime();
                return c-d;
            });
        },
        searchQuestion: (state, action) => {
            const findTitle = state.questions.items.filter(el => {
                    return el.title.toLowerCase() === action.payload.title.toLowerCase() && el.moderation === true
                }
            )

            const findPartTitle = state.questions.items.filter(el => {
                return el.title.slice(0, action.payload.title.length).toLowerCase() === action.payload.title.toLowerCase() && el.moderation === true
            })

            const findTag = state.questions.items.filter(el => {
                    return el.tags[0].tag.toLowerCase() === action.payload.title.toLowerCase() && el.moderation === true
                }
            )

            if(findTag.length){
                state.questionsArr.items = findTag
            }
            else if(findPartTitle.length){
                state.questionsArr.items = findPartTitle
            }
            else{
                state.questionsArr.items = findTitle
            }

        },
        addQuestion: (state, action: PayloadAction<TypePost>) => {
            console.log('раз')

            if(state.questions.items.filter(el => el.moderation === true).length === state.questionsArr.items.filter(el => el.moderation === true).length){
                state.questionsArr.items = [action.payload, ...state.questionsArr.items].filter(el => el.moderation === true)
            }
            
            state.questions.items = [action.payload, ...state.questions.items].filter(el => el.moderation === true)

        },
        deleteQuestionFn: (state, action) => {
            state.questions.items = state.questions.items.filter(el => el._id !== action.payload._id)
            state.questionsArr.items = state.questionsArr.items.filter(el => el._id !== action.payload._id)
        },
        createCommentFn: (state, action) => {
            if('_id' in state.question.items && state.question.items._id === action.payload._id){
                state.commentCreateStatus = 'success'

                console.log(action.payload)
                state.question.items = action.payload

                state.comments = action.payload.comments
            }
        },
        createLikeFn: (state, action) => {
            state.questions.items = state.questions.items.filter(el => {


                if(el._id === action.payload.result.postID){

                    console.log('wqf')
                    console.log(action.payload.result)

                    if(action.payload.result.status === 'like'){
                        console.log('sss')
                        return el.likes.push(action.payload.result)
                    }   
                    else{
                        el.likes = el.likes.filter(el => el._id !== action.payload.result._id)
                    }
                }       

                return el
                
            })

            state.questionsArr.items = state.questionsArr.items.filter(el => {

                if(el._id === action.payload.result.postID){
                    console.log('YEAH')

                    if(action.payload.result.status === 'like'){
                        console.log(action.payload.result)
                        el.likes.push(action.payload.result)
                    }   
                    else{
                        el.likes = el.likes.filter(el => el._id !== action.payload.result._id)
                    }
                }       

                return el
                
            })


            state.myAnswer.value = state.questions.items.filter(el => {
                return el.comments.some(i => i.user === action.payload.result._id)
            })

          
            state.myQuestions.items = state.questionsArr.items.filter(el => {

                if(el.user === null || el.user === undefined) return null
                
                return el.user
                
            })
            

            const filteredPosts = state.questions.items.filter(el => {
                return el.likes.some(l => l._id === action.payload.result._id)
            })
            const sortedPosts = filteredPosts.sort((a, b) => {
                // Находим лайк текущего пользователя в каждом посте (или null, если его нет)
                const userLikeA = a.likes.find(like => like._id === action.payload.result._id)
                const userLikeB = b.likes.find(like => like._id === action.payload.result._id)
        
                // Если лайка нет, оставляем порядок без изменений
                 if (!userLikeA) return 1
                 if (!userLikeB) return -1
        
                // Преобразуем даты лайков в таймстемпы
                const dateA = new Date(userLikeA.date).getTime()
                const dateB = new Date(userLikeB.date).getTime()
        
                // Сортируем от новых к старым
                return dateB - dateA
            })
        
            state.favorite = sortedPosts
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchQuestions.pending, (state) => {
                state.questions.items = []
                state.questions.status = 'loading'
            })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions.items = action.payload
            state.questionsArr.items = state.questions.items.filter(el => el.moderation === true)
            state.questions.status = 'success'
        })
        .addCase(fetchQuestions.rejected, (state) => {
            state.questions.items = []
            state.questions.status = 'errors'
        })
        .addCase(fetchTags.pending, (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'success'
        })
        .addCase(fetchTags.rejected, (state) => {
            state.tags.items = []
            state.tags.status = 'errors'
        })
        .addCase(createQuestion.pending, (state) => {
            state.questionChanges.status = 'loading'
        })
        .addCase(createQuestion.fulfilled, (state, action) => {
            state.questionChanges.status = 'success'
            state.questions.items = [action.payload, ...state.questions.items]
            state.questionsArr.items = state.questions.items.filter(el => el.moderation === true)
        })
        .addCase(createQuestion.rejected, (state) => {
            state.questionChanges.status = 'errors'
        })     
        .addCase(getQuestion.pending, (state) => {
            state.question.status = 'loading'
        })   
        .addCase(getQuestion.fulfilled, (state, action) => {
            console.log(action.payload)

            state.question.status = 'success'
            state.question.items = action.payload
        })   
        .addCase(getQuestion.rejected, (state) => {
            state.question.status = 'errors'
        })   
        .addCase(createComment.pending, (state) => {
            state.commentCreateStatus = 'loading'
        })
        .addCase(createComment.rejected, (state) => {
            state.commentCreateStatus = 'errors'
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            if ('comments' in state.question.items && Array.isArray(state.question.items.comments)) {
                state.question.items.comments = state.question.items.comments.filter(el => el.commentId !== action.payload.id)
            }
        })
    }
})

export const questionsReducer = questionsSlice.reducer
export const {createTag, deleteTag, getMyQuestions, deleteQuestionFn, addQuestion, getMyModerationQuestions, getMyAnswer, 
    getMyFavorite, resetPost, getQuestionPage, resetPostStatus, popularQuestions, oldQuestions, 
    newQuestion, searchQuestion, resetUserPosts, createCommentFn, createLikeFn} = questionsSlice.actions

