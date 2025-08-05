// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Result Portal</span>
        <div>
          <button className="btn btn-outline-light mx-2" onClick={() => navigate('/student/register')}>
            Student
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate('/admin/login')}>
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
