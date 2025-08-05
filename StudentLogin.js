import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { rollNumber, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'student');
      navigate('/student/my-results');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Login</h2>
      <form onSubmit={loginStudent}>
        <input type="text" placeholder="Roll Number" required className="form-control my-2" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        <input type="password" placeholder="Password" required className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default StudentLogin;
