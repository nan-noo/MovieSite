const express = require('express');
const favoriteRouter = express.Router();

const {Favorite} = require('../models/Favorite');

favoriteRouter.post('/favoriteNumber', (req, res) => {
    // get favorite number from mongoDB
    // then response to front end
    Favorite.find({"movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);

        res.status(200).json({favoriteNumberSuccess: true, favoriteNumber: info.length})
    })
})

favoriteRouter.post('/favorited', (req, res) => {
    // check whether the movie favorited from mongoDB
    // then response to front end
    Favorite.find({"userFrom": req.body.userFrom, "movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);

        let result = info.length !== 0 ? true : false;
        res.status(200).json({favoritedSuccess: true, favorited: result})
    })
})

favoriteRouter.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({"userFrom": req.body.userFrom, "movieId": req.body.movieId})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, doc})
    })
})

favoriteRouter.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true});
    }); 
})

favoriteRouter.post('/getFavoritedMovie', (req, res) => {
    Favorite.find({'userFrom': req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, favorites});
        })
})

module.exports = favoriteRouter;
