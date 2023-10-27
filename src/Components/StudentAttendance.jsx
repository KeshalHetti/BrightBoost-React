import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

export default function StudentAttendance() {
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const studentUsers = userSnapshot.docs
        .filter(doc => doc.data().role === 'student')
        .map(doc => ({ id: doc.id, ...doc.data() }));

      setUsers(studentUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      const attendanceCollection = collection(db, 'attendance');
      const attendanceSnapshot = await getDocs(attendanceCollection);

      let attendanceObj = {};
      attendanceSnapshot.forEach(doc => {
        attendanceObj[doc.id] = doc.data();
      });

      setAttendanceData(attendanceObj);
    };

    fetchAttendance();
  }, []);

  const handleAttendance = async (userId, day) => {
    const attendanceRef = doc(db, 'attendance', userId);

    const currentAttendance = attendanceData[userId]?.[day] || false;
    const attendanceUpdate = {
      [day]: !currentAttendance
    };

    try {
      await setDoc(attendanceRef, attendanceUpdate, { merge: true });
      setAttendanceData(prevData => ({
        ...prevData,
        [userId]: {
          ...prevData[userId],
          ...attendanceUpdate
        }
      }));
    } catch (err) {
      console.error("Error! Updating attendance failed:", err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="attendance table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Monday</TableCell>
            <TableCell align="center">Tuesday</TableCell>
            <TableCell align="center">Wednesday</TableCell>
            <TableCell align="center">Thursday</TableCell>
            <TableCell align="center">Friday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <TableCell align="center" key={day}>
                  <Checkbox
                    checked={attendanceData[user.id]?.[day] || false}
                    onChange={() => handleAttendance(user.id, day)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
