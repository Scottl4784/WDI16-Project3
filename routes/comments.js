const express = require('express')
const router = express.Router({ mergeParams: true})
const {User, Movie} = require('../db/schema')

// Get list of all users movies
router.get('/', (req, res) => {
        const userId = req.params.userId
        const movieId = req.params.movieId
        User.findById(userId)
        .then((user) => {
            const comments = user.movies.id(movieId).comments
            res.send({comments})
        })
    })


module.exports = router