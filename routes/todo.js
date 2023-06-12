const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo');

// Get all the todos
router.get('/todos', async (req,res) => {
    const todos = await Todo.find();
    res.json(todos)
})

// Create new Todo
router.post('/add-todo', async (req,res) => {
    const {title, desc, active} = req.body
    const newTodo = new Todo({title, desc, active})
    await newTodo.save();
    res.status(201).json(newTodo);
})

// Edit Todo
router.put('/edit-todo/:id',async (req,res) => {
    const {title, desc, active} = req.body
    const updatedTodo = {};
    if (title){updatedTodo.title = title};
    if (desc){updatedTodo.desc = desc};
    if (active){updatedTodo.active = active};
    const todo = await Todo.findByIdAndUpdate(req.params.id, {$set: updatedTodo}, {new: true})
    res.json({todo})
})

// Delete existing todo
router.delete(`/delete-todo/:id`, async (req,res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.send(todo)
})

module.exports = router;