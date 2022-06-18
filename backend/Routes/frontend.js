const express = require('express')
const auth = require('../Middleware/auth')
const Genre = require('../Model/Genre')
const Movie = require('../Model/Movies')
const Subscription = require('../Model/Subscription')
const User = require('../Model/User')
const Watch = require('../Model/Watch')
const router = express.Router()
const History = require('../Model/History')
const UserSubscription = require('../Model/UserSubscription')

router.get('/latest/dashboard',async(req,res)=>{
    try {
        const users = await User.find().sort({createdAt:-1}).limit(5)
        const movies= await Movie.find().sort({createdAt:-1}).limit(5).populate('genre_id')
        const popular = await Movie.find().sort({stream:-1}).limit(5).populate('genre_id')
        const freeUser = await User.countDocuments({'plan':'free'})
        const premiumUser = await User.countDocuments({'plan':'premium'})
        const totalMovie = await Movie.countDocuments({'type':'movie'})
        const totalSeries = await Movie.countDocuments({'type':'series'})
        const totalUser = freeUser+premiumUser
        const totalGenre = await Genre.countDocuments()

        res.json({users,movies,popular,freeUser,premiumUser,totalGenre,totalMovie,totalSeries,totalUser})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/history',auth,async(req,res)=>{
    try {
        const pageno = req.body.pageno
        const itemsCountPerPage = req.body.itemsCountPerPage

        const history = await History.find({'user_id':req.user._id}).populate('movie_id').sort('-_id').skip(pageno*itemsCountPerPage).limit(itemsCountPerPage)
        const totalCount = await History.countDocuments({'user_id':req.user._id})

        var arr=[]

        for (var story of history) {
            story =  story.toObject()
            const list = await  Watch.findOne({'movie_id':story.movie_id._id})
            if(list){
                story.movie_id.is_list=true
            }else{
                story.movie_id.is_list=false
            }
            arr.push(story)
        }


        res.json({arr,totalCount})
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.get('/genre/all',auth,async(req,res)=>{
    try {
        const genres = await Genre.find()
        const feature = await Movie.findOne({'feature':true}).sort('-_id')
        const history = await History.find({'user_id':req.user._id}).populate('movie_id').limit(4)
        
        var arr=[]
        var wait = genres.map(async genre=>{
            genre = genre.toObject()
            genre.movies = await Movie.find({'genre_id':genre._id}).limit(4)
            arr.push(genre)
        })
        await Promise.all(wait)
        
        res.json({arr,feature,history})
    } catch (error) {
        res.status(500).json(error.message)
    }

})

router.post("/movie/type",auth,async(req,res)=>{
    try {
        var pageno = req.body.pageno-1
        var itemsCountPerPage = req.body.itemsCountPerPage

        const movies = await Movie.find({'type':req.body.type}).populate('genre_id').skip(pageno* itemsCountPerPage).limit(itemsCountPerPage)
        var totalCount = await Movie.countDocuments({'type':req.body.type})
        
        var arr = []

        for (let movie of movies) {
            movie = movie.toObject()
            var list = await Watch.findOne({'movie_id':movie._id,'user_id':req.user._id})
            if(list){
                movie.is_list = true
            } else {
                movie.is_list = false
            }
            arr.push(movie)  
        }
        res.json({arr,totalCount})  
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/new/movies',auth,async(req,res)=>{
    try {

        var pageno = req.body.pageno-1
        var itemsCountPerPage = req.body.itemsCountPerPage

        const movies = await Movie.find().sort({createdAt:-1}).skip(pageno* itemsCountPerPage).limit(itemsCountPerPage)
        const totalCount = await Movie.countDocuments()

        var arr = []

        for (let movie of movies) {
            movie = movie.toObject()
            var list = await Watch.findOne({'movie_id':movie._id,'user_id':req.user._id})
            if(list){
                movie.is_list = true
            } else {
                movie.is_list = false
            }
            arr.push(movie)  
        }
        res.json({arr,totalCount})  
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/watchlist',auth,async(req,res)=>{
    try {
        var pageno = req.body.pageno-1
        var itemsCountPerPage = req.body.itemsCountPerPage

        const list = await Watch.find({'user_id':req.user._id,}).populate('movie_id').populate('user_id').skip(pageno* itemsCountPerPage).limit(itemsCountPerPage)

        const totalCount = await Watch.countDocuments({'user_id':req.user._id})

        res.json({list,totalCount})   
    } catch (error) {
        res.status(500).json(error.message) 
    }
})

router.get('/subscription',auth,async(req,res)=>{
    const subscription= await Subscription.find()
    res.json(subscription)
})

router.post('/subscription/update',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        user.subscription_id = req.body.subscription_id
        const subscription = await Subscription.findById(req.body.subscription_id)
        user.plan = "premium"

        var date = new Date()
        var newDate = new Date(date.setMonth(date.getMonth()+subscription.period))
        var year = newDate.getFullYear()
        var month = newDate.getMonth()+1
        var day = newDate.getDate()
        user.expire_date = `${year}/${month}/${day}`

        var userSubscription = new UserSubscription({
            user_id: req.user._id,
            subscription_id:req.body.subscription_id
        })
        await userSubscription.save()

        await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/search',async(req,res)=>{
    try {
        let data = []
        if(req.body.type=="all"){
            data= await Movie.find({'name':{ $regex: '.*' + req.body.input + '.*' }})
        }else {
            data= await Movie.find({'name':{ $regex: '.*' + req.body.input + '.*' },'type':req.body.type})
        }
        res.json(data)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/current/user',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('subscription_id')
        if(user.plan=="premium"){
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()+1
            const day = date.getDate()

            const today = `${year}/${month}/${day}`
            if(today>user.expire_date){
                user.plan = 'free'
                await user.save()
            }
        }

        res.json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/user/subscription',auth,async(req,res)=>{
    try {
        const userSubscription = await UserSubscription.find().sort('-_id').populate('user_id').populate('subscription_id')
        res.json(userSubscription)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/user/subscription/:id',auth,async(req,res)=>{
    try {
        const subscription = await UserSubscription.findById(req.params.id)
        const user= await User.findById(subscription.user_id)
        user.plan="free"
        await subscription.delete()
        await user.save()
       
        res.json(subscription)
    } catch (error) {
        res.json(error.message)
    }
})




module.exports = router