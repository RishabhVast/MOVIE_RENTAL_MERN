const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

 module.exports = userSchema.methods.getAuthToken = function () {
return jwt.sign({
  _id: this._id, isAdmin: this.isAdmin}, 
   config.get("jwtPrivateKey")
 );
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}
const User = mongoose.model("Users", userSchema);
module.exports.User = User;
module.exports.validateUser = validateUser;
