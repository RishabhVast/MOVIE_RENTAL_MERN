const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const validObjectId = require("../middleware/validObjectId");

router.get("/", async (req, res) => {
  const users = await User.find({});
  if (users.length == 0) return res.status(404).send("No Users found");

  res.send(users);
});

router.get("/:id", validObjectId, async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (!user) return res.status(404).send("No User found");
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(" Email id  Already Exist");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

router.put("/:id", validObjectId, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

router.delete("/:id", validObjectId, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

module.exports = router;
