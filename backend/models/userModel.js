const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountType: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  emailVerified: { type: Boolean },
  isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('User', userSchema);

