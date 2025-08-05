import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentRegister() {
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    email: '',
    password: '',
    department: '',
    year: '',
    dob: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/student/register', form);
      alert('Student registered! Please login.');
      navigate('/student/login');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto shadow-sm">
        <h3 className="text-center mb-3">Student Registration</h3>
        <form onSubmit={registerStudent}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control my-2"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            className="form-control my-2"
            required
            value={form.rollNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control my-2"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control my-2"
            required
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            className="form-control my-2"
            value={form.department}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year (e.g., 2nd)"
            className="form-control my-2"
            value={form.year}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="form-control my-2"
            value={form.dob}
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{' '}
          <span
            className="text-primary"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/student/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentRegister;
