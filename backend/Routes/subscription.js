const express = require('express')
const adminAuth = require('../Middleware/adminAuth')
const Subscription = require('../Model/Subscription')
const router = express.Router()

router.get('/',adminAuth,async(req,res)=>{
    try {
        const subscription= await Subscription.find()
        res.json(subscription)
    } catch (error) {
        res.status(500).json(erro.message)
        
    }
})

router.post('/',adminAuth,async(req,res)=>{
    try {
        var subscription = new Subscription({
            name:req.body.name,
            price:req.body.price,
            period:req.body.period
        })
        subscription = await subscription.save()
        res.json(subscription)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/:id',adminAuth,async(req,res)=>{
    try {
        const subscription = await Subscription.findById(req.params.id)
        res.json(subscription)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.put('/:id',async(req,res)=>{
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            price:req.body.price,
            period:req.body.period
        },{new:true})
        res.json(subscription)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/:id',adminAuth,async(req,res)=>{
   try {
       const subscription = await Subscription.findByIdAndRemove(req.params.id)
       res.json(subscription)
   } catch (error) {
       res.status(500).json(error.message)
   }
})

module.exports = router