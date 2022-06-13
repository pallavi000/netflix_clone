const express = require('express')
const auth = require('../Middleware/auth')
const router = express.Router()

router.get('/',auth,async(req,res)=>{
    try {
        const history = await History.find({'user_id':req.user._id})
        res.json(history)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/:id',auth,async(req,res)=>{
    try {
        var history = new History({
            user_id:req.user._id,
            movie_id:req.params.id
        })
        history = await history.save()
        res.json(history)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router