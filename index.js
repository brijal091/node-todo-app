const express = require('express');
const app = express();   
const port = 5000

// Routes
app.get('/', (req,res)=>{
    res.send("Hello World")
})

// Port to listen the app
app.listen(port, ()=>{
    console.log(`Your app listening on port ${port}`)
})