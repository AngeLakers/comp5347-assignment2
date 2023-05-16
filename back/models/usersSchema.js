// models\UsersSchema.js
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const UsersSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: Number, required: true },
})
const MoSchema = mongoose.model("users", UsersSchema);

module.exports = MoSchema