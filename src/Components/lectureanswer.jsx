import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import {db, auth} from '../config/firebase';
import BannerBackground from "../Assets/home-banner-background.png";
import { Box, Card, CardContent, Typography, Button, Divider  } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LecturerReplyPage() {
  const [subject, setSubject] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const qnaSnapshot = await getDocs(query(collection(db, 'qna'), where('subject', '==', subject)));
      const questionsArr = qnaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsArr);
      const uniqueEmails = [...new Set(questionsArr.map(q => q.emailasked))];
      setEmails(uniqueEmails);
    };
    if (subject) {
      fetchQuestions();
    }
  }, [subject]);

  const handleAnswerSubmit = async () => {
    try {
      const qnaRef = doc(db, 'qna', selectedQuestion.id);
      const timestampReplied = Date.now();
      await updateDoc(qnaRef, {
        emailanswered: auth.currentUser.email,
        timestampreplied: timestampReplied,
        timetaken: timestampReplied - selectedQuestion.timestampasked,
        answer: answer
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">BrightBoost Lecture</h1>
        </div>
      </div>

      <div className='lecturer-boxcontainer'>
        <Card className="lecturer-card">
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>Answer a Question</Typography>

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select value={subject} onChange={e => setSubject(e.target.value)}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Maths">Maths</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
              </Select>
            </FormControl>

            {subject && (
              <FormControl fullWidth>
                <InputLabel>Emails</InputLabel>
                <Select value={selectedEmail} onChange={e => setSelectedEmail(e.target.value)}>
                  {emails.map(email => <MenuItem key={email} value={email}>{email}</MenuItem>)}
                </Select>
              </FormControl>
            )}

            {selectedEmail && (
              <FormControl fullWidth>
                <InputLabel>Questions</InputLabel>
                <Select value={selectedQuestion.id} onChange={e => {
                  const question = questions.find(q => q.id === e.target.value);
                  setSelectedQuestion(question);
                }}>
                  {questions.filter(q => q.emailasked === selectedEmail).map(q => (
                    <MenuItem key={q.id} value={q.id}>{q.question}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {selectedQuestion.question && (
              <TextField
                fullWidth
                multiline
                rows={1}
                label="Type your answer here"
                variant="outlined"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
            )}
            <Divider style={{ margin: '5px 0' }} />
            <Button variant="contained" onClick={handleAnswerSubmit}>Submit Answer</Button>
          </CardContent>
        </Card>
      </div>
    </div >
  );
}
