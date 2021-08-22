const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
    },
    responseTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    }
}, { timestamps: true}); // 생성된 시간 등, 자동처리

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment};