import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar';
import Home from './Components/home';
import SignupForm from './Components/signup';
import StudentHome from './Components/studenthome';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/studenthome' element={<StudentHome />} />
      </Routes>
    </div>
  );
}

export default App;
