import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar';
import Home from './Components/home';
import SignupForm from './Components/signup';
import StudentHome from './Components/studenthome';
import LectureHome from './Components/lecturehome';
import AdminHome from './Components/adminhome';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/studenthome' element={<StudentHome />} />
        <Route path='/lecturehome' element={<LectureHome />} />
        <Route path='/adminhome' element={<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App;
