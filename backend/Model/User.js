const mongoose = require('mongoose')
const express = require('express')
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:'user'}
},{timestamps:true})

const User = mongoose.model('user',userSchema)
module.exports = User