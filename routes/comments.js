const express = require('express')
const router = express.Router({ mergeParams: true})
const {User, Movie, Comment} = require('../db/schema')

// Get list of all comments
router.get('/', (req, res) => {
        const userId = req.params.userId
        const movieId = req.params.movieId
        User.findById(userId)
        .then((user) => {
            const comments = user.movies.id(movieId).comments
            res.send({comments})
        })
    })

// Creat new comment
// Create new movie
router.post('/', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
      const newComment = new Comment (req.body)
      user.movies.comments.push(newComment)
      user.save()
    })
    .then((user) => {
      res.send({user})
    })
    .catch((err) => {
      console.log(err)
    })
  })


module.exports = router