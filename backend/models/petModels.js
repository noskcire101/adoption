const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = new Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    fbaccount:{
        type:String
    },
    pet:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    birthdate:{
        type:String,
        required:true
    },
    dewormed:{
        type:String,
        required:true
    },
    vaccinated:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    heart:{
        type:Array,
    },
    coverImage:{
        type:String,
    },
}, {timestamps: true})

module.exports = mongoose.model('Pet', petSchema)
