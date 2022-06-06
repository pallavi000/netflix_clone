const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    name:{type:String,required:true},
    detail:{type:String,required:true},
    image:{type:String,required:true},
    type:{type:String,required:true},
    release_date:{type:String,required:true},
    duration:{type:String,required:true},
    genre_id:{type:[mongoose.Schema.Types.ObjectId],ref:'genre'},
    season_no:{type:String},
    no_of_episode:{type:String},
    videos:{type:Array},
    video:{type:String},
    trailer:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    stream:{type:Number,default:0},
    watchListCount:{type:Number,default:0}
})

const Movie = mongoose.model('movie',movieSchema)
module.exports= Movie
