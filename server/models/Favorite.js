const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    userFrom: { // 다른 document를 참조할 수 있게 해 줌
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true}); // 생성된 시간 등, 자동처리

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {Favorite};