const express= require('express')
const router = express.Router()
const Movie = require('../Model/Movies')
const adminAuth = require('../Middleware/adminAuth')
const User = require('../Model/User')
const auth = require('../Middleware/auth')

router.get('/',async(req,res)=>{
    try {
        const movie =await  Movie.find().populate('genre_id')
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }

})

router.post('/add-movie',adminAuth, async(req,res)=>{
    try {
        let picture=' '
        let videos= ' '
        let video =' '
        let trailer=' '

        if(req.files){
            if(req.files.image){
                const image = req.files.image
                console.log(image)
               var r= Math.random()
                r= r.toString().replace('.','-')
                var is_error= false
                const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

                 picture = '/assets/image'+imageName
                const uploadPath = process.env.IMAGE_UPLOAD_PATH+imageName

               image.mv(uploadPath,(error)=>{
                is_error= error
               })
               if(is_error){
                return  res.status(500).json(is_error)
               }
            }

            if(req.files.video){
                const movie = req.files.video
                var r = Math.random()
                r= r.toString().replace('.','-')
                const movieName = new Date().getDate()+r+'.'+movie.name.split('.').pop()
                console.log('movie')

                 video = '/assets/video/'+movieName
                const uploadPath = process.env.movie_UPLOAD_PATH+movieName

                var isError = false

                movie.mv(uploadPath,(error)=>{
                    isError = error
                })

                if(isError) {
                    return res.status(500).json(isError)
                }

                
            }

            if(req.files.videos){
                const series = req.files.videos
                console.log(series)
                var r = Math.random()
                var is_error = false
                r = r.toString().replace('.','-')
                const seriesName = new Date().getDate()+r+'.'+series.name.split(".").pop()
                console.log('series')
                 videos = '/assets/series/'+seriesName
                const uploadPath = process.env.SERIES_UPLOAD_PATH+seriesName

                series.mv(uploadPath,(error)=>{
                    is_error = error
                })
                if(is_error){
                    return res.status(500).json(is_error)

                }
            }
    
            if(req.files.trailer){
                const short_clip = req.files.trailer
                var r = Math.random()
                var is_error = false
                r = r.toString().replace('.','-')
                const trailerName = new Date().getDate()+r+'.'+short_clip.name.split('.').pop()
                console.log('trailer')
                 trailer = '/assets/trailer/'+trailerName

                const uploadPath = process.env.TRAILER_UPLOAD_PATH+trailerName
                short_clip.mv(uploadPath,(error)=>{
                    is_error = error
                })
                if(is_error){
                    return res.status(500).json(is_error)

                }
                
            }
        }

console.log(req.body)
        var movie = new Movie({
            
            name:req.body.name,
            image:picture,
            type:req.body.type,
            release_date:req.body.release_date,
            duration:req.body.duration,
            genre_id:req.body.genre_id,
            season_no:req.body.season,
            no_of_episode:req.body.episode,
            videos:videos,
            video:video,
            trailer:trailer,
            user_id:req.user._id,
            detail:req.body.detail
        })


        movie = await movie.save()
        res.json(movie)

    } catch (error) {
        res.json(error.message)
    }
})

router.put('/update:id',async(req,res)=>{
    try {


       

        const movie = await Movie.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            image:picture,
            type:req.body.type,
            release_date:req.body.release_date,
            duration:req.body.duration,
            genre:req.body.genre_id,
            season_no:req.body.season,
            no_of_episode:req.body.episode,
            videos:videos,
            video:video,
            trailer:trailer,
            user_id:req.user._id
        },{new:true})
        movie.save()
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/remove/:id',async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id)
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/genre',auth,async(req,res)=>{
    try {
        const movie = await Movie.find({'genre_id':req.body.genre_id})
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router


