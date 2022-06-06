const express = require('express')
const adminAuth = require('../Middleware/adminAuth')
const router = express.Router()
const Genre = require('../Model/Genre')
const Movie = require('../Model/Movies')

router.get('/',adminAuth,async(req,res)=>{
    try {
        const genre = await Genre.find()
        res.json(genre)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/',adminAuth,async(req,res)=>{
    try {
        var genre = new Genre({
            name:req.body.name,
            slug:req.body.name.replace(' ','-')
        })
       genre =  await genre.save()
        res.json(genre)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/:id',adminAuth,async(req,res)=>{
    try {
        var genre = await Genre.findById(req.params.id)
        res.json(genre)
    } catch (error) {
        res.status(500).json(error.message)
    }

})

router.put('/:id',adminAuth,async(req,res)=>{
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            slug:req.body.name.replace(' ','-')
        },{new:true})
        res.json(genre)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/:id',adminAuth,async(req,res)=>{
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id)
        res.json(genre)
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})




module.exports = router