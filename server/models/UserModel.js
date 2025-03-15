import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: Number,
        default: 0
    },
    speciality: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    role: {
        type: String,
    },
    link: {
        type: String
    },
    numberResponse: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    subscribes: {
        type: Array,
        default: []
    },
    countSubs: {
        type: Number,
        default: 0
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    backgroundProfile: {
        type: String,
        default: ''
    },
    chat: {
        type: Array,
        default: []
    },
    complaints: {
        type: Array, 
        default: []
    },
    achievements:{
        type: Array,
        default: []
    },
    ban: {
        type: Boolean,
        default: false
    },
    banText: {
        type: String,
        default: ''
    },
    lastChat: {
        type: Array,
        default: []
    },
    _id: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
)


export default mongoose.model('User', userSchema)