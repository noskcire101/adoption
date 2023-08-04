require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


const app = express()


//middleware
app.use(express.json())

app.use((req,res,next) =>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workouts',workoutRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{

//listen for request
app.listen(process.env.PORT, () => {console.log(`Connected to db in Server running on port ${process.env.PORT}`)})

})
.catch((error)=>{
    console.log(error)
})










