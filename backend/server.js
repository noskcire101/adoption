require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const petRoutes = require('./routes/pet')

// express app
const app = express()


//middleware
app.use(express.json())
app.use((req,res,next) =>{
    console.log(req.path, req.method)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/pets',petRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
//listen for request if succesfully running
app.listen(process.env.PORT, () => {console.log(`Connected to db in Server running on port ${process.env.PORT}`)})

})
.catch((error)=>{
    console.log(error)
})










