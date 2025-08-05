// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: String,
  year: String,
  dob: Date,
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
