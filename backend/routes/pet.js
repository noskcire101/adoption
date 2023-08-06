
const express = require('express')
const{ getPets, getPet, createPet} = require('../controllers/petController')

const router = express.Router()


// GET all workouts
router.get('/', getPets)


// GET sigle workouts
router.get('/:id', getPet)


// POST a new workouts
router.post('/', createPet)


// // Delete a workouts
// router.delete('/:id', deleteWorkout)


// // Update a workouts
// router.patch('/:id', updateWorkout)


module.exports = router