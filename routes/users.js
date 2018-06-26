const express = require('express')
const router = express.Router()
const {User} = require('../db/schema')

// Get list of users
router.get('/', (req, res) => {
  User.find().then(users => {
    res.send({users})
  })
  .catch((err) => {
    console.log(err)
  })
})

// Show single user
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Create a new user
router.post('/', (req, res) => {
  const newUser = new User (req.body)
  newUser.save()
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    console.log(err)
  })
})

// Update user

// Delete user
router.delete('/:userId', (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(() => {
    User.find()
    .then((users) => {
      res.send({users})
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router
