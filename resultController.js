const Result = require('../models/Result');
const Student = require('../models/Student');

// Admin Adds or Updates Result for a Student
exports.addOrUpdateResult = async (req, res) => {
  const { studentId, semester, subjects } = req.body;

  try {
    let student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Calculate totals
    let totalMarks = 0;
    let maxTotal = 0;

    subjects.forEach(sub => {
      totalMarks += sub.marks;
      maxTotal += sub.maxMarks;
    });

    const percentage = ((totalMarks / maxTotal) * 100).toFixed(2);

    // Simple grade logic (can be improved)
    let grade = '';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 75) grade = 'A';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 40) grade = 'C';
    else grade = 'F';

    const resultStatus = percentage < 40 ? 'Fail' : 'Pass';

    let result = await Result.findOne({ student: studentId, semester });

    if (result) {
      // Update existing result
      result.subjects = subjects;
      result.totalMarks = totalMarks;
      result.percentage = percentage;
      result.grade = grade;
      result.resultStatus = resultStatus;
      await result.save();
      return res.json({ message: 'Result updated successfully', result });
    } else {
      // Create new result
      result = new Result({
        student: studentId,
        semester,
        subjects,
        totalMarks,
        percentage,
        grade,
        resultStatus
      });
      await result.save();
      return res.status(201).json({ message: 'Result published successfully', result });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Student Views Their Own Result
exports.getMyResult = async (req, res) => {
  try {
    const studentId = req.user.id;

    const results = await Result.find({ student: studentId }).populate('student', 'name rollNumber department');
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin Views Result of a Particular Student
exports.getResultByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.find({ student: id }).populate('student', 'name rollNumber email');
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
