const  express = require('express')
const auth = require('../Middleware/auth')
const Movie = require('../Model/Movies')
const Watch = require('../Model/Watch')
const router = express.Router()

router.get('/',auth,async(req,res)=>{
    try {
        const list = await Watch.find({'user_id':req.user._id,}).populate('movie_id').populate('user_id').sort('-_id')
        res.json(list)   
    } catch (error) {
        res.status(500).json(error.message) 
    }
})

router.post('/:id',auth,async(req,res)=>{
    try {
        var list = new Watch({
            movie_id:req.params.id,
            user_id:req.user._id
        })
        var movie = await Movie.findById(req.params.id)
        movie.watchListCount=  movie.watchListCount+1
        await movie.save()
        list= await list.save()
        res.json({movie,list})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.delete('/:id',auth,async(req,res)=>{
    try {
        const list = await Watch.findOne({'user_id':req.user._id,'movie_id':req.params.id})
        if(list) {
            const movie = await Movie.findById(list.movie_id)
            movie.watchListCount = movie.watchListCount-1
            await list.delete()
            await movie.save()
        }

        res.json('success')
    } catch (error) {    
        res.status(500).json(error.message) 
    }

})


module.exports= router