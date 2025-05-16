import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        default: 0
    },
    speciality: {
        type: Array,
        default: []
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
    passwordHash: String,
    email: {
        type: String,
        required: true,
        unique: true
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
    vkid: {
        type: String
    }
    },
    {
        timestamps: true
    }
)


export default mongoose.model('User', userSchema)