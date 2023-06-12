const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
} ,
{
    timestamps: true,
    get: time => time.toDateString()
})

module.exports = mongoose.model('Todo', TodoSchema);