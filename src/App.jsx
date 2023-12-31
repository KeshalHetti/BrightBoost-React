import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar';
import Home from './Components/home';
import SignupForm from './Components/signup';
import StudentHome from './Components/studenthome';
import LectureHome from './Components/lecturehome';
import AdminHome from './Components/adminhome';
import LectureProfile from './Components/lectureprofile';
import LectureAnswer from './Components/lectureanswer';
import StudentProfile from './Components/studentprofile';
import StudentQuestion from './Components/stquestion';
/* import StudentAttend from './Components/studentattend';
import RecordAttend from './Components/recordattend'; */
import STimeTable from './Components/stimetable';
import TutorSchedule from './Components/tutorschedule';
import StudentAttendance from './Components/StudentAttendance';

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
        <Route path='/lectureprofile' element={<LectureProfile />} />
        <Route path='/lectureanswer' element={<LectureAnswer />} />
        <Route path='/studentprofile' element={<StudentProfile />} />
        <Route path='/stquestion' element={<StudentQuestion />} />
        {/* <Route path='/studentattend' element={<StudentAttend />} />
        <Route path='/recordattend' element={<RecordAttend />} /> */}
        <Route path='/stimetable' element={<STimeTable />} />
        <Route path='/tutorschedule' element={<TutorSchedule />} />
        <Route path='/StudentAttendance' element={<StudentAttendance />} />
      </Routes>
    </div>
  );
}

export default App;
