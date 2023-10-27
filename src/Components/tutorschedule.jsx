import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import BannerBackground from "../Assets/home-banner-background.png";

export default function LectureTimetable() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const initialSubjects = ['Mathematics', 'Science', 'Information Technology', 'English'];

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'timetable', 'subjects');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data().data);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index, field) => {
    setEditIndex(index);
    setEditField(field);
  };

  const handleSubjectChange = async (e, index, field) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
    setEditIndex(null);
    setEditField(null);

    await setDoc(doc(db, 'timetable', 'subjects'), { data: newData });
  };

  return (

    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            BrightBoost - Timetabe
          </h1>
        </div>
      </div>

      <TableContainer className='timetable' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Timetable</TableCell>
              <TableCell align="right">Monday</TableCell>
              <TableCell align="right">Tuesday</TableCell>
              <TableCell align="right">Wednesday</TableCell>
              <TableCell align="right">Thursday</TableCell>
              <TableCell align="right">Friday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day, dayIndex) => (
                  <TableCell align="right" key={dayIndex}>
                    {editIndex === rowIndex && editField === day ? (
                      initialSubjects.map(subject => (
                        <div key={subject}>
                          <Radio
                            checked={row[day] === subject}
                            onChange={(e) => handleSubjectChange(e, rowIndex, day)}
                            value={subject}
                            name="subject"
                            inputProps={{ 'aria-label': subject }}
                          />
                          {subject}
                        </div>
                      ))
                    ) : (
                      <>
                        {row[day]}
                        <EditIcon onClick={() => handleEdit(rowIndex, day)} style={{ cursor: 'pointer' }} />
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
