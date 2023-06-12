const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all the todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log("get todo", error);
  }
});

// Create new Todo
router.post("/add-todo", async (req, res) => {
  try {
    const { title, desc, active } = req.body;
    const newTodo = new Todo({ title, desc, active });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log("create todo", error);
  }
});

// Edit Todo
router.put("/edit-todo/:id", async (req, res) => {
  try {
    const { title, desc, active } = req.body;
    const updatedTodo = {};
    if (title) {
      updatedTodo.title = title;
    }
    if (desc) {
      updatedTodo.desc = desc;
    }
    if (active) {
      updatedTodo.active = active;
    }
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updatedTodo },
      { new: true }
    );
    res.json({ todo });
  } catch (error) {
    console.log("edit todo", error);
  }
});

// Delete existing todo
router.delete(`/delete-todo/:id`, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.send(todo);
  } catch (error) {
    console.log("delete todo", error);
  }
});

module.exports = router;
