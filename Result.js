// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  semester: String,
  subjects: [
    {
      name: String,
      marks: Number,
      maxMarks: Number
    }
  ],
  totalMarks: Number,
  percentage: Number,
  grade: String,
  resultStatus: { type: String, enum: ['Pass', 'Fail'], default: 'Pass' },
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
