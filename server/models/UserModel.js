import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
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
    backgroundProfile: String,
    chat: {
        type: Array,
        default: []
    },
    achievements:{
        type: Array,
        default: []
    },
    },
    {
        timestamps: true
    }
)


export default mongoose.model('User', userSchema)