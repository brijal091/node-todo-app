const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

const fetchUser = require("../middlewares/fetchuser");

// Validation library
const { check, validationResult } = require("express-validator");

// Get todos
router.get("/todos", fetchUser, async (req, res) => {
  try {
    // console.log(req.userId)
    const todos = await Todo.find({ user: req.userId });
    // console.log("Test this user based todos",todos)
    res.json(todos);
  } catch (error) {
    console.log("get todo", error);
    res.status(500).send("Something is wrong");
  }
});

// Create new Todo
router.post(
  "/add-todo",
  fetchUser,
  [
    check("title", "Title must be between 2-30 char").trim().isLength({
      min: 2,
      max: 30,
    }),
    check("desc", "desc must be between 2-100 char").trim().isLength({
      min: 2,
      max: 100,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    }
    try {
      const { title, desc, active } = req.body;
      const newTodo = new Todo({ title, desc, active, user: req.userId });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      console.log("create todo", error);
      res.status(500).send("Something is wrong");
    }
  }
);

// Edit Todo
router.put(
  "/edit-todo/:id",
  fetchUser,
  [
    check("title", "title can not be empty").trim(),
    check("desc", "description can not be empty").trim(),
  ],
  async (req, res) => {
    try {
      const { title, desc, active } = req.body;
      // Check if todo is edited by the same user of todo
      let user_todo = await Todo.findById(req.params.id);
      if (user_todo.user !== req.userId) {
        return res.status.send(401).send("Not allowed");
      }
      const updatedTodo = {};
      if (title && title.length) updatedTodo.title = title;
      if (desc && title.length) updatedTodo.desc = desc;
      if (active) updatedTodo.active = active;
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { $set: updatedTodo },
        { new: true }
      );
      res.json({ todo });
    } catch (error) {
      console.log("edit todo", error);
      res.status(500).send("Something is wrong");
    }
  }
);

// Delete existing todo
router.delete(`/delete-todo/:id`, fetchUser, async (req, res) => {
  try {
    // Check if todo is edited by the same user of todo
    let user_todo = await Todo.findById(req.params.id);
    if (user_todo.user !== req.userId) {
      return res.status.send(401).send("Not allowed");
    }
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) res.send("Todo not exist");
    else res.send(todo);
  } catch (error) {
    console.log("Delete todo", error);
    res.status(500).send("Something is wrong");
  }
});

module.exports = router;
