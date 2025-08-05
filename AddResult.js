import React, { useState } from 'react';
import axios from 'axios';

function AddResult() {
  const [studentId, setStudentId] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', marks: '', maxMarks: '' }]);

  const addSubjectField = () => {
    setSubjects([...subjects, { name: '', marks: '', maxMarks: '' }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    if (field === 'marks' || field === 'maxMarks') {
      updated[index][field] = parseInt(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setSubjects(updated);
  };

  const submitResult = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Ensure all marks and maxMarks are numbers (defensive check)
      const cleanSubjects = subjects.map(sub => ({
        name: sub.name,
        marks: Number(sub.marks),
        maxMarks: Number(sub.maxMarks)
      }));

      await axios.post('http://localhost:5000/api/result', {
        studentId,
        semester,
        subjects: cleanSubjects
      }, {
        headers: { 'x-auth-token': token }
      });

      alert('Result saved successfully');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error saving result');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student Result</h2>
      <form onSubmit={submitResult}>
        <input
          type="text"
          placeholder="Student ID"
          required
          className="form-control my-2"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          required
          className="form-control my-2"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        {subjects.map((sub, index) => (
          <div key={index} className="border p-3 mb-2">
            <input
              type="text"
              placeholder="Subject Name"
              className="form-control mb-2"
              value={sub.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Marks"
              className="form-control mb-2"
              value={sub.marks}
              onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Marks"
              className="form-control mb-2"
              value={sub.maxMarks}
              onChange={(e) => handleSubjectChange(index, 'maxMarks', e.target.value)}
            />
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addSubjectField}>
          + Add Subject
        </button>
        <br />
        <button className="btn btn-success">Submit Result</button>
      </form>
    </div>
  );
}

export default AddResult;
