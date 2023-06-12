const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo');

router.get('/add-todo', (req,res) => {
    res.send("I am called")
})

module.exports = router;