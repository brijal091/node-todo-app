const mongoose = require('mongoose');

const DB = "mongodb://127.0.0.1:27017/nodeTodoApp"

// Connecting to the Local DB
mongoose.connect(DB)
.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log(err));