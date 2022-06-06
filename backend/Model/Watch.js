const mongoose = require('mongoose')
const listSchema= new mongoose.Schema({
    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:'movie'},
    user_Id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    count:{type:String}
},{timestamps:true})


const Watch = mongoose.model('watch',listSchema)
module.exports = Watch





