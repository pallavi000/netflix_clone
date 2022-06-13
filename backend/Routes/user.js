const express = require('express')
const router = express.Router()
const User = require('../Model/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const adminAuth = require('../Middleware/adminAuth')
const { v4: uuidv4, NIL } = require('uuid');
const auth = require('../Middleware/auth');

router.get('/',adminAuth, async(req,res)=>{
    try {
        const user =await  User.find()
        res.json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/register',async(req,res)=>{
    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(req.body.password,salt)
        var user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            role:req.body.role
        })
       user = await user.save()
       res.json(user)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        console.log(user)
        if(user){
            const valid = await bcrypt.compare(req.body.password,user.password)  
            if(valid){
               
                var token = await jwt.sign({ _id: user._id,email:user.email,role:user.role }, 'netflix');
                console.log(token)
                res.json({token:token,user:user})
                
            }else{
                res.status(400).json('login failed!,Invalid Password')
            }
        }else{
            res.json('user not found')
        }
        
    } catch (error) {
        res.json(error.message)
    }
   
})



router.get('/admin',adminAuth,async(req,res)=>{
res.json('success')
})

router.get('/:id',adminAuth,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
       res.status.json(error.message)
    }
})


router.put('/:id',adminAuth,async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            username:req.body.username,
            email:req.body.email
        },{new:true})
        res.json(user)  
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/forgot/password',async(req,res)=>{
    try {
        var user = await User.findOne({'email':req.body.email})
        if(user){
           const unicode = uuidv4()
           console.log(unicode)
           user.verifyKey = unicode
           await user.save()
           res.json('success')
        }else{
            res.status(400).json('user not found')
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/check-user',async(req,res)=>{
    try {
        const user = await User.findOne({'verifyKey':req.body.verifyKey})
        if(user){
            res.json('success')
        }else{
            res.status(404).json('Invalid verify key')
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/change/password',async(req,res)=>{
    try {
        const user = await User.findOne({'verifyKey':req.body.verifyKey})
        if(user){
            if(req.body.newPassword== req.body.confirmPassword){
                const salt = await bcrypt.genSalt(10)
                const password =  await bcrypt.hash(req.body.newPassword,salt)
                user.password = password
                await user.save()
                res.json('Password update successfully !')
            }else{
                res.status(400).json("Password doesn't  match.")
            }
           
        }else{
            res.status(404).json('user not found')
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.post('/update/password',auth,async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
       
        const user = await User.findById(req.user._id)
        if(user){
            if(req.body.newPassword== req.body.confirmPassword){
                user.password = await bcrypt.hash(req.body.newPassword,salt)
                await user.save()
                res.json(user)
            }else{
                res.status(400).json('password doesnot match')
            }
        }else{
            res.status(400).json('user not found')
        }
    
    } catch (error) {
        res.status(500).json(error.message)
    }
})



module.exports = router