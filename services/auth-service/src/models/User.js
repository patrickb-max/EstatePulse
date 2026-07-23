const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['ADMIN', 'BROKER', 'PROPERTY_MANAGER', 'TENANT'],
      default: 'TENANT'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);