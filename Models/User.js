const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  re_password: {
    type: String,
    minlength: 8,
    required: true,
  },
  token: { 
    type: String 
  },
})

module.exports = mongoose.model("User",UserSchema);