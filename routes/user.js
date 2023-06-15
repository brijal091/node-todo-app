const express = require("express");
const routes = express.Router();
const User = require("../models/User");

// middleware
const fetchUser = require("../middlewares/fetchuser");

const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const router = require("./todo");
//JWT Token
var jwt = require("jsonwebtoken");
const JWT_SECRET = "TestSecreteKey";

// Get User Details
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    // console.log(req.userId)
    const user = await User.findOne({ _id: req.userId });
    res.send(user);
  } catch (error) {
    console.log("get todo", error);
    res.status(500).send("Something Went wrong");
  }
});

// Create a New User (Register)
router.post(
  "/register",
  [
    check("userName", "User name must be min 4 char and max 12.").isLength({
      min: 4,
      max: 12,
    }),
    check("email", "Please Enter correct email. ")
      .isEmail()
      .isLength({ max: 30 }),
  ],
  async (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.json(errors);
      const userExist = await User.findOne({ email } && { userName });
      if (userExist)
        return res
          .status(401)
          .json({ error: "User with this email or userName already exist" });

      // password encryption
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Creating New User
      const newUser = new User({
        userName,
        firstName,
        lastName,
        email,
        password: secPass,
      });
      // Save the data in database
      let savedUser = await newUser.save();
      return res.status(201).send(`New User Created Successfully`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something is wrong");
    }
  }
);

// Login API
router.post("/login", [], async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).send("User does not exist");
    }
    // it returns boolean value
    const match = await bcrypt.compare(password, user.password);
    // console.log(match);
    if (match) {
      const user_id = { user: { id: user.id } };
      const JWTToken = jwt.sign(user_id, JWT_SECRET);
      // console.log(JWTToken);
      return res.status(200).json({ JWTToken });
    } else return res.status(401).send("User does not exist");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
