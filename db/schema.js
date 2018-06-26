const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    title: {
        type: String
    },
    comment: {
        type: String
    }
})

const MovieSchema = new Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    image: {
        type: String
    },
    director: {
        type: String
    },
    productionDate: {
        type: Date
    },
    comments: [CommentSchema]
})

const UserSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String,
        default: "https://www.fillmurray.com/200/300"
    },
    movies: [MovieSchema]
})

const User = mongoose.model('User', UserSchema)
const Movie = mongoose.model('Movie', MovieSchema)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
    User,
    Movie,
    Comment
}