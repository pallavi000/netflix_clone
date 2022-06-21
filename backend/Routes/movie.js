const express= require('express')
const router = express.Router()
const Movie = require('../Model/Movies')
const adminAuth = require('../Middleware/adminAuth')
const User = require('../Model/User')
const auth = require('../Middleware/auth')
const History = require('../Model/History')
const Watch = require('../Model/Watch')

router.get('/',auth,async(req,res)=>{
    try {
        const movie =await  Movie.find().populate('genre_id').populate('user_id').sort('-_id')
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }

})


router.post('/add-movie',adminAuth, async(req,res)=>{
    try {
        let picture=' '
        let videos= []
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

                 picture = '/assets/image/'+imageName
                const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName

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

                 video = '/assets/movie/'+movieName
                const uploadPath = process.env.movie_UPLOAD_PATH+"/"+movieName

                var isError = false

                movie.mv(uploadPath,(error)=>{
                    isError = error
                })

                if(isError) {
                    return res.status(500).json(isError)
                }

                
            }

            if(req.files.videos){
                req.files.videos.map(video=>{
                    const series = video
                    console.log(series)
                    var r = Math.random()
                    var is_error = false
                    r = r.toString().replace('.','-')
                    const seriesName = new Date().getDate()+r+'.'+series.name.split(".").pop()
                    console.log('series')
                     var arr = '/assets/series/'+seriesName
                     videos.push(arr)
                    const uploadPath = process.env.SERIES_UPLOAD_PATH+"/"+seriesName
    
                    series.mv(uploadPath,(error)=>{
                        is_error = error
                    })
                    if(is_error){
                        return res.status(500).json(is_error)
    
                    }
                })
               
            }
    
            if(req.files.trailer){
                const short_clip = req.files.trailer
                var r = Math.random()
                var is_error = false
                r = r.toString().replace('.','-')
                const trailerName = new Date().getDate()+r+'.'+short_clip.name.split('.').pop()
                console.log('trailer')
                 trailer = '/assets/trailer/'+trailerName

                const uploadPath = process.env.TRAILER_UPLOAD_PATH+"/"+trailerName
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
            season_no:req.body.season_no,
            no_of_episode:req.body.no_of_episode,
            videos:videos,
            video:video,
            trailer:trailer,
            user_id:req.user._id,
            detail:req.body.detail,
            feature:req.body.feature
        })


        movie = await movie.save()
        res.json(movie)

    } catch (error) {
        res.json(error.message)
    }
})

router.get('/:id',auth, async(req,res)=>{
    try {
        const movie= await Movie.findById(req.params.id)
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})



router.put('/update/:id',auth,async(req,res)=>{
    try {

        const movie = await Movie.findById(req.params.id)

            movie.name=req.body.name,
            movie.type=req.body.type,
            movie.release_date=req.body.release_date,
            movie.duration=req.body.duration,
            movie.genre=req.body.genre_id,
            movie.season_no=req.body.season_no,
            movie.no_of_episode=req.body.no_of_episode,
            movie.user_id=req.user._id,
            movie.feature=req.body.feature
    

        if(req.files){
            if(req.files.image){
                const image = req.files.image
               
               var r= Math.random()
                r= r.toString().replace('.','-')
                var is_error= false
                const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

                 var picture = '/assets/image/'+imageName
                 const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName
                 console.log(uploadPath)

               image.mv(uploadPath,function(error){
                if(error){
                    is_error= error
                    console.log(error)

                }
               })
               if(is_error){
                return  res.status(500).json(is_error)
               }
               movie.image = picture
            }

            if(req.files.video){
                const clip = req.files.video
                var r = Math.random()
                r= r.toString().replace('.','-')
                const movieName = new Date().getDate()+r+'.'+clip.name.split('.').pop()
               

               var  video = '/assets/movie/'+movieName
                const uploadPath = process.env.movie_UPLOAD_PATH+"/"+movieName

                var isError = false

                clip.mv(uploadPath,function(error){
                    if(error){
                        isError = error
                    }
                })

                if(isError) {
                    return res.status(500).json(isError)
                }
                movie.video = video

                
            }

            if(req.files.videos){
                const series = req.files.videos
               
                var r = Math.random()
                var is_error = false
                r = r.toString().replace('.','-')
                const seriesName = new Date().getDate()+r+'.'+series.name.split(".").pop()
                
                var videos = '/assets/series/'+seriesName
                const uploadPath = process.env.SERIES_UPLOAD_PATH+"/"+seriesName

                series.mv(uploadPath,function(error){
                    if(error){
                        is_error = error
                    }
                })
                if(is_error){
                    return res.status(500).json(is_error)

                }
                movie.videos = videos 
            }
    
            if(req.files.trailer){
                const short_clip = req.files.trailer
                var r = Math.random()
                var is_error = false
                r = r.toString().replace('.','-')
                const trailerName = new Date().getDate()+r+'.'+short_clip.name.split('.').pop()
             
                 var trailer = '/assets/trailer/'+trailerName

                const uploadPath = process.env.TRAILER_UPLOAD_PATH+"/"+trailerName
                short_clip.mv(uploadPath,function(error){
                    if(error){
                        is_error = error
                    }
                })
                if(is_error){
                    return res.status(500).json(is_error)

                }
                movie.trailer = trailer
                
            }
        }

        await movie.save()
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/remove/:id',async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id)
        const history = await History.deleteMany({'movie_id':req.params.id})
        const list = await Watch.deleteMany({'movie_id':req.params.id})
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/genre',auth,async(req,res)=>{
    try {
        const movie = await Movie.find({'genre_id':req.body.genre_id}).populate('genre_id')
        res.json(movie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router


