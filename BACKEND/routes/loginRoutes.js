const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    console.log("error" + error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("user not found in db");
    return res.status(400).send("invalid login ");
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    console.log("password wrong");
    return res.status(400).send("Invalid username or password");
  }

  const token = user.getAuthToken();
  res.send(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
