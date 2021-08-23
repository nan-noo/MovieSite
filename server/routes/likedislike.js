const express = require('express');
const likeRouter = express.Router();

const {Like} = require('../models/Like');
const {Dislike} = require('../models/Dislike');

likeRouter.post('/getLikes', (req, res) => {
    Like.find({'commentId': req.body.commentId})
    .exec((err, likes) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, likes});
    })
});

likeRouter.post('/getDislikes', (req, res) => {
    Dislike.find({'commentId': req.body.commentId})
    .exec((err, dislikes) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, dislikes});
    })
});


likeRouter.post('/upLike', (req, res) => {

    const like = new Like(req.body);
    like.save((err, likeResult) => {
        if(err) return res.status(400).send(err);
        
        Dislike.findOneAndDelete(req.body)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).send(err);
                return res.status(200).json({success: true});
            })
    })
});

likeRouter.post('/unLike', (req, res) => {
        
    Like.findOneAndDelete(req.body)
        .exec((err, likeResult) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true});
        })
});

likeRouter.post('/upDislike', (req, res) => {
    const dislike = new Dislike(req.body);
    dislike.save((err, dislikeResult) => {
        if(err) return res.status(400).send(err);
        
        Like.findOneAndDelete(req.body)
            .exec((err, likeResult) => {
                if(err) return res.status(400).send(err);
                return res.status(200).json({success: true});
            })
    })
});

likeRouter.post('/unDislike', (req, res) => {
        
    Dislike.findOneAndDelete(req.body)
        .exec((err, dislikeResult) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true});
        })
});

module.exports = likeRouter;