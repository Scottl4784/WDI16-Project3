const express = require('express')
const router = express.Router({ mergeParams: true})
const {User, Movie} = require('../db/schema')

// Get list of all users movies
router.get('/', (req, res) => {
  User.find().then(user => {
    res.send({user})
  })
  .catch((err) => {
    console.log(err)
  })
})

// Show individual movie
router.get('/:movieId', (req,res) => {
    const userId = req.params.userId
    const movieId = req.params.movieId
    User.findById(userId)
    .then((user) => {
        const movie = user.movies.id(movieId)
        res.send({movie})
    })
})

// Create new movie
router.post('/', (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    const newMovie = new Movie (req.body)
    user.movies.push(newMovie)
    return user.save()
  })
  .then((user) => {
    res.send({user})
  })
  .catch((err) => {
    console.log(err)
  })
})

// Delete Movie
router.delete('/:movieId', (req, res) => {
  const userId = req.params.userId
  const movieId = req.params.movieId
  User.findById(userId)
  .then((user) => {
      user.movies.id(movieId).remove()
      return user.save()
  })
  .then((savedUser) => {
      res.send({ user: savedUser})
  })
})

module.exports = router