const Pet = require('../models/petModels')
const mongoose = require('mongoose')


//get all workouts
const getPets = async (req,res) => {
    const pets = await Pet.find({}).sort({createdAt: -1})
    res.status(200).json(pets)
}


//get a single workout
const getPet = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Id found'})
    }
    const pet = await Pet.findById(id)

    if(!pet){
        return  res.status(404).json({error: 'No such data'})
    }
   
    res.status(200).json(pet)
}


//create new workout
const createPet = async (req,res) => {
    const {coverImage,street,city,state,contact,fbaccount,pet,type,gender,breed,birthdate,dewormed,vaccinated,reason,uid,heart} = req.body

    //add doc to db
    try{
        const petdata = await Pet.create({coverImage,street,city,state,contact,fbaccount,pet,type,gender,breed,birthdate,dewormed,vaccinated,reason,uid,heart})
        res.status(200).json(petdata)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a workout
// const deleteWorkout = async(req,res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'No such Id found'})
//     }

//     const workout = await Workout.findOneAndDelete({_id:id})

//     if(!workout){
//         return  res.status(404).json({error: 'No such data'})
//     }
//     res.status(200).json(workout)
// }


// //update a workout
// const updateWorkout = async(req,res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'No such Id found'})
//     }

//     const workout = await Workout.findOneAndUpdate({_id:id},{
//         ...req.body
//     })

//     if(!workout){
//         return  res.status(404).json({error: 'No such data'})
//     }
//     res.status(200).json(workout)
// }


module.exports = {
    getPets, getPet, createPet
}