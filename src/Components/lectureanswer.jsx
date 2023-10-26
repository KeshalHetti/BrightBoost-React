import React, { useState } from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function QuestionPage() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = () => {
    // Implement your logic to submit the question here
    console.log('Name:', name);
    console.log('Subject:', subject);
    console.log('Question:', question);
  };

  return (
    <div className="home-container">

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            BrightBoost Lecture
          </h1>
        </div>
      </div>

      <div className='lecturer-boxcontainer'>
        <Card className="lecturer-card">
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              Answer a Question
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Name of the student"
                variant="standard"
                value={name}
                onChange={handleNameChange}
              />
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
              }}>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subject}
                  onChange={handleSubjectChange}
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
                label="Type your answer here"
                variant="outlined"
                value={question}
                onChange={handleQuestionChange}
              />
            </Box>
            <Button variant="contained" onClick={handleQuestionSubmit}>
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div >
  );
}
