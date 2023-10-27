import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDoc, doc, where, query, getDocs } from 'firebase/firestore';
import BannerBackground from "../Assets/home-banner-background.png";
import { Box, Card, CardContent, Typography, Button, Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function QuestionPage() {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!auth.currentUser) {
        console.error("User isn't logged in.");
        return;
      }
      const userEmail = auth.currentUser.email;
      const qnaSnapshot = await getDocs(query(collection(db, 'qna'), where('emailasked', '==', userEmail)));
      setAnswers(qnaSnapshot.docs.map(doc => doc.data()));
    }

    fetchAnswers();
  }, []);

  const handleQuestionSubmit = async () => {
    if (!auth.currentUser) {
      console.error("User isn't logged in.");
      return;
    }

    try {
      const userEmail = auth.currentUser.email;
      const userSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', userEmail)));

      if (userSnapshot.empty) {
        console.error(`Email not found in user data: ${userEmail}`);
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.role !== 'student') {
        console.error('Questions can only be submitted by students.');
        return;
      }

      setUserName(userEmail);

      const timestampAsked = Date.now();
      await addDoc(collection(db, 'qna'), {
        emailasked: userEmail,
        question: question,
        timestampasked: timestampAsked,
        timestampreplied: null,
        timetaken: 0,
        subject: subject
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error! Fetching user role failed:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">BrightBoost Lecture Profile</h1>
        </div>
      </div>
      <div className='lecturer-boxcontainer'>
        <Card className="lecturer-card">
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              Ask a question
            </Typography>

            <Box sx={{
              '& > :not(style)': { m: 1, width: '70ch' },
            }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Maths">Maths</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Type your question here"
                variant="outlined"
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
            </Box>

            <Button variant="contained" onClick={handleQuestionSubmit}>
              Submit Question
            </Button>
          </CardContent>
        </Card>

        {answers.map((answerData, index) => (
          <Card className="lecturer-answer" key={index}>
            <CardContent>
              <Typography variant="h6">
                Question: {answerData.question}
              </Typography>
              <Typography variant="subtitle1">
                Answer: {answerData.answer || 'Awaiting answer...'}
              </Typography>
              <Typography variant="subtitle2">
                Answered by: {answerData.emailanswered || 'Not answered yet'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Questions Successfully Submitted
        </Alert>
      </Snackbar>
    </div>
  );
}
