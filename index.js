// const connectToMongo = require('./db');
const express = require('express');
const app = express();   
const port = 5000
// connectToMongo();
require('./db');

// Using my created routes
app.use('/todo', require('./routes/todo'))

// Middle ware 
app.use(express.json())

// Routes
app.get('/', (req,res)=>{
    res.send("Hello World")
})

// Port to listen the app
app.listen(port, ()=>{
    console.log(`Your app listening on port ${port}`)
})