const mongoose = require('mongoose')
const userSubscriptionSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    subscription_id:{type:mongoose.Schema.Types.ObjectId,ref:'subscription'}
},{timestamps:true})

const UserSubscription = mongoose.model('userSubscription',userSubscriptionSchema)
module.exports = UserSubscription