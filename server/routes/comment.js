const express = require('express');
const commentRouter = express.Router();

const {Comment} = require('../models/Comment');

commentRouter.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if(err) return res.status(400).send(err);

        Comment.find({'_id': comment._id})
            .populate('writer') // writer key에 User 전체 정보가 담김
            .exec((err, result) => {
                if(err) return res.status(400).send(err);
                return res.status(200).json({success: true, result});
            })
        
    })
});

commentRouter.post('/getComments', (req, res) => {
    Comment.find({'movieId': req.body.movieId})
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, comments});
        })
});

module.exports = commentRouter;