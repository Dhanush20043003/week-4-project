import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();

    // Only allow hardcoded admin credentials
    const adminEmail = 'dhanush@gmail.com';
    const adminPassword = '123';

    if (email !== adminEmail || password !== adminPassword) {
      alert('Unauthorized access: Invalid Admin Credentials');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      navigate('/admin/add-result');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm col-md-6 mx-auto">
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={loginAdmin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
