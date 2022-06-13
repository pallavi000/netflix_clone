const mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema({
    name:{type:String,required:true},
   price:{type:String,required:true},
   period:{type:Number,required:true}
},{timestamps:true})

const Subscription = mongoose.model('subscription',subscriptionSchema)
module.exports = Subscription

