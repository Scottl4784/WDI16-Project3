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