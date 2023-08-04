
const express = require('express')
const{ createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout} = require('../controllers/workoutController')

const router = express.Router()


// GET all workouts
router.get('/', getWorkouts)


// GET sigle workouts
router.get('/:id', getWorkout)


// POST a new workouts
router.post('/', createWorkout)


// Delete a workouts
router.delete('/:id', deleteWorkout)


// Update a workouts
router.patch('/:id', updateWorkout)


module.exports = router