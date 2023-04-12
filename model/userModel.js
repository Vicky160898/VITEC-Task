const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
});

const User = model("User", UserSchema);

module.exports = User;
