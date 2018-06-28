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
router.post('/', (req, res) => {
    const movieId = req.params.movieId
    const userId = req.params.userId
    const newComment = new Comment(req.body)
    User.findById(userId)
    .then((user) => {
      const movie = user.movies.id(movieId)
      console.log(userId)
      movie.comments.push(newComment)
      return user.save()
    })
    .then((user) => {
      res.send({user})
    })
    .catch((err) => {
      console.log(err)
    })
  })

  // Edit Comment
  router.put('/:commentId', (req,res) => {
      const userId = req.params.userId
      const movieId = req.params.movieId
      const newComment = req.body
      User.findById(userId)
      .then((user) => {
          const comment = user.movies.id(movieId).comments.id(commentsId)
          comment.title = newComment.title
          comment.author = newComment.author
          comment.comment = newComment.comment
          return user.save()
      })
      .then((user) => {
          res.send(user)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  router.delete('/:commentId', (req, res) => {
    const userId = req.params.userId
    const movieId = req.params.movieId
    const commentId = req.params.commentId
    User.findById(userId)
    .then((user) => {
        console.log(commentId)
        user.movies.id(movieId).comments.id(commentId).remove()
        return user.save()
    })
    .then((user) => {
        res.send({ user})
    })
    .catch((err) => {
        console.log(err)
      })
  })

module.exports = router