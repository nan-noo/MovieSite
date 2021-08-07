const express = require('express');
const favoriteRouter = express.Router();

const {Favorite} = require('../models/Favorite');

favoriteRouter.post('/favoriteNumber', (req, res) => {
    // get favorite number from mongoDB
    // then response to front end
    Favorite.find({"movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);

        res.status(200).json({favoriteSuccess: true, favoriteNumber: info.length})
    })
})

module.exports = favoriteRouter;
