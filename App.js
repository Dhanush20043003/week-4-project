import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import AddResult from './pages/AddResult';
import MyResults from './pages/MyResults';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import StudentRegister from './pages/StudentRegister';

function App() {
  return (  
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
       
<Route path="/student/register" element={<StudentRegister />} />

        {/* Protected Routes */}
        <Route
          path="/admin/add-result"
          element={
            <PrivateRoute role="admin">
              <AddResult />
            </PrivateRoute>
          }
        />

        <Route
          path="/student/my-results"
          element={
            <PrivateRoute role="student">
              <MyResults />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
