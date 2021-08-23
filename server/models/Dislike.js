const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
}, { timestamps: true}); // 생성된 시간 등, 자동처리

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = {Dislike};