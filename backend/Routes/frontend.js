const express = require('express')
const auth = require('../Middleware/auth')
const Genre = require('../Model/Genre')
const Movie = require('../Model/Movies')
const User = require('../Model/User')
const router = express.Router()

router.get('/latest/dashboard',async(req,res)=>{
    try {
        const users = await User.find().sort({createdAt:-1}).limit(5)
        const movies= await Movie.find().sort({createdAt:-1}).limit(5).populate('genre_id')
        const popular = await Movie.find().sort({stream:-1}).limit(5).populate('genre_id')
        res.json({users,movies,popular})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.get('/genre/all',auth,async(req,res)=>{
    try {
        const genres = await Genre.find()
        
        var arr=[]
        var wait = genres.map(async genre=>{
            genre = genre.toObject()
            genre.movies = await Movie.find({'genre_id':genre._id})
            arr.push(genre)
        })
        await Promise.all(wait)
        
        res.json(arr)
    } catch (error) {
        res.status(500).json(error.message)
    }

})

router.post("/movie/type",auth,async(req,res)=>{
    try {
        const movie = await Movie.find({'type':req.body.type}).populate('genre_id')
        res.json(movie)  
    } catch (error) {
        res.status(5000).json(error.message)
    }
})

router.get('/new/movies',auth,async(req,res)=>{
    try {
        const movie = await Movie.find().sort({createdAt:-1}).limit(10)
        res.json(movie)  
    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router