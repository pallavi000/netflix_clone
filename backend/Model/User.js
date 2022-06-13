const mongoose = require('mongoose')
const express = require('express')
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:'user'},
    plan:{type:String,default:'free'},
    subscription_id:{ type:mongoose.Schema.Types.ObjectId,ref:'subscription'},
    verifyKey:{type:String},
    expire_date:{type:String}
},{timestamps:true})

const User = mongoose.model('user',userSchema)
module.exports = User

