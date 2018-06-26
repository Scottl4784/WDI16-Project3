require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((err) => {
        console.log('ERROR', err)
    })

const Schema = require('./schema')
const User = Schema.User
const Movie = Schema.Movie
const Comment = Schema.Comment

User.remove()
    .then(() => {
        const scott = new User({
            name: "Scott",
        })

        const interstellar = new Movie({
            title: "Interstellar",
            summary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
            director: "Christopher Nolan",
        })

        const comment1 = new Comment({
            title: "Best soundtrack of all time?",
            comment: "Hans Zimmer absolutely nailed the soundtrack for this film!"
        })
        const comment2 = new Comment({
            title: "Anne's performance rather lackluster",
            comment: "I was very underwhelmed with how poorly she was portrayed."
        })
    

    interstellar.comments = [comment1, comment2]

    scott.movies = [interstellar]

    const users = [scott]

    users.forEach((user) => {
        user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((err) => {
            console.log(err)
        })
    })
})