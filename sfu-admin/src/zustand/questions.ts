import { create } from "zustand";
import { TypePost } from "../types/types";

type TypeStatus = 'loading' | 'success' | 'errors' | 'none'

interface QuestionsStore {
    questions: {
        items: TypePost[] | []
    },
    questionsModeration: {
        items: TypePost[] | []
    },
    questionsArr: {
        items: TypePost[] | []
    },
    myQuestions: {
        items: TypePost[] | [],
        status: TypeStatus
    },
    question: {
        items: TypePost | []
    },
    myAnswer: {
        value: any[],
        status: TypeStatus
    },
    favorite: [] | TypePost[],
    getAllQuestions: (data: TypePost[]) => void,
    newQuestions: () => void,
    oldQuestions: () => void,
    popularQuestions: () => void,
    searchQuestion: (text: string, moderation: boolean) => void,
    moderationQuestion: (question: TypePost) => void,
    deleteQuestion: (id: string) => void,
    getQuestion: (question: TypePost) => void,
    getMyQuestions: (id: string) => void,
    getMyAnswer: (id: string) => void,
    getMyFavorite: (id: string) => void,
    addModerationQuestion: (question: TypePost) => void
}

export const useQuestionsStore = create<QuestionsStore>()((set) => ({
    questions: {
        items: []
    },
    questionsModeration: {
        items: []
    },
    questionsArr: {
        items: [],
        status: 'none'
    },
    question: {
        items: []
    },
    myQuestions: {
        items: [],
        status: 'none'
    },
    myAnswer: {
        value: [],
        status: 'none'
    },
    favorite: [],
    getAllQuestions: (data: TypePost[]) => set({
        questions: {
            items: data.filter(el => el.moderation === true)
        },

        questionsModeration: {
            items: data.filter(el => el.moderation === false)
        },

        questionsArr: {
            items: data
        }
    }),
    getMyQuestions: (id: string) => set(state => ({ 
        myQuestions: {
            items: [...state.questionsArr.items].filter(el => {
                if(el.user === null) return
                
                return el.user._id === id
            }),
            status: 'success'
        }
    })),
    getMyAnswer: (id: string) => set(state => {

        return {
            myAnswer: {
                value: [...state.questions.items].filter(el => {
        
                    return el.comments.some(i => i.user._id === id)
                }),
                status: 'success'
            }
        }

    }),
    getMyFavorite: (id: string) => set(state => {

        return {
            favorite: [...state.questions.items].filter(el => {
                return el.likes.some(l => l._id === id); // Use .some for correct behavior
            })
        }

    }),
    popularQuestions: () => set(state => ({
        questions:{
            items: [...state.questionsArr.items.filter(el => el.moderation === true)].sort((a, b) => b.likes.length - a.likes.length)
        }, 
        questionsModeration: {
            items: [...state.questionsArr.items.filter(el => el.moderation === false)].sort((a, b) => b.likes.length - a.likes.length)
        }
     })),
     newQuestions: () => set(state => ({
        questions: {
            items: [...state.questionsArr.items.filter(el => el.moderation === true)].sort((a, b) => {
             let c = new Date(a.createdAt).getTime();
             let d = new Date(b.createdAt).getTime();
             return d-c;
         })
        },
        questionsModeration: {
            items: [...state.questionsArr.items.filter(el => el.moderation === false)].sort((a, b) => {
                let c = new Date(a.createdAt).getTime();
                let d = new Date(b.createdAt).getTime();
                return d-c;
            })
        }
    })),
    oldQuestions: () => set(state => ({
        questions: {
            items: [...state.questionsArr.items.filter(el => el.moderation === true)].sort((a, b) => {
             let c = new Date(a.createdAt).getTime();
             let d = new Date(b.createdAt).getTime();
             return c-d;
            })
        },
        questionsModeration: {
            items: [...state.questionsArr.items.filter(el => el.moderation === false)].sort((a, b) => {
             let c = new Date(a.createdAt).getTime();
             let d = new Date(b.createdAt).getTime();
             return c-d;
            })
        }

    })),
    searchQuestion: (text, moderation) => set(state => {

        const findTitle = [...state.questionsArr.items.filter(el => el.moderation === true)].filter(el => {
                return el.title.toLowerCase() === text.toLowerCase()
            }
        )
        const findTitleModeration = [...state.questionsArr.items.filter(el => el.moderation === false)].filter(el => {
            return el.title.toLowerCase() === text.toLowerCase()
        })

        const findPartTitle = [...state.questionsArr.items.filter(el => el.moderation === true)].filter(el => {
            return el.title.slice(0, text.length).toLowerCase() === text.toLowerCase()
        })
        const findPartTitleModeration = [...state.questionsArr.items.filter(el => el.moderation === false)].filter(el => {
            return el.title.slice(0, text.length).toLowerCase() === text.toLowerCase()
        })

        const findTag = [...state.questionsArr.items.filter(el => el.moderation === true)].filter(el => {
                return el.tags[0].tag.toLowerCase() === text.toLowerCase()
            }
        )
        const findTagModeration = [...state.questionsArr.items.filter(el => el.moderation === false)].filter(el => {
            return el.tags[0].tag.toLowerCase() === text.toLowerCase()
        })

        if(findTag.length | findTagModeration.length){
            if(moderation){
                return {
                    questionsModeration: {
                        items: findTagModeration
                    }
                }
            }

            return {
                questions: {
                    items: findTag
                }
            }
        }
        else if(findPartTitle.length | findPartTitleModeration.length){
            if(moderation){
                return {
                    questionsModeration: {
                        items: findPartTitleModeration
                    }
                }
            }

            return {
                questions: {
                    items: findPartTitle
                }
            }
        }
        else{
            if(moderation){
                return{
                    questionsModeration: {
                        items: findTitleModeration
                    }
                }
            }

            return{
                questions: {
                    items: findTitle
                }
            }
        }
    }),
    moderationQuestion: (question) => set(state => {

        console.log(question)
        console.log([question, ...state.questions.items])
        if(question.moderation){
            return {
                    questions: {
                        items: [question, ...state.questions.items]
                    },
                    questionsArr: {
                        items: [question, ...state.questionsArr.items.filter(el => el._id !== question._id)],
                        status: 'success'
                    },
                    questionsModeration: {
                        items: [...state.questionsModeration.items].filter(el => el._id !== question._id)
                    }
                }
        }

        return {
            questionsArr: {
                items: [...state.questionsArr.items].filter(el => el._id !== question._id),
                status: 'success'
            },
            questionsModeration: {
                items: [...state.questionsModeration.items].filter(el => el._id !== question._id)
            }
        }
    }),
    deleteQuestion: (id: string) => set(state => {

        return{
            questionsArr: {
                items: [...state.questionsArr.items].filter(el => el._id !== id),
                status: 'success'
            },
            questions: {
                items: [...state.questions.items].filter(el => el._id !== id)
            }
        }
    }),
    getQuestion: question => set({question: {
        items: question
    }}),
    addModerationQuestion: (question) => set(state => {
        return {
            questionsArr: {items: [question, ...state.questionsArr.items]},
            questionsModeration: {items: [question, ...state.questionsModeration.items]}
        }
    })
}));