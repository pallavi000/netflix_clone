const mongoose = require('mongoose')
const historySchema= new mongoose.Schema({
    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:'movie'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
},{timestamps:true})


const History = mongoose.model('history',historySchema)
module.exports = History





