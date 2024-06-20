import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import ProfileNavbar from './ProfileNavbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import MyGraphs from './MyGraphs';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={< Login/>} />
            <Route path="/register" element={< Register/>} />
            <Route path="/profile" element={< Profile/>} />
            <Route path="/MyGraphs" element={< MyGraphs/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();

  if (location.pathname.startsWith('/profile') || location.pathname.startsWith('/uploads') || location.pathname.startsWith('/my')) {
    return <ProfileNavbar />;
  }

  return <MainNavbar />;
}

export default App;
