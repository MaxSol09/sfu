import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
    title: String,
    moderation: {
        type: Boolean,
        default: false
    },
    tags: {
        type: Array,
        default: []
    },
    text: String,
    viewCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post', QuestionSchema)