import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

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
    <div>
      <h1>Ask a Question</h1>
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
        <FormControl fullWidth>
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
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Type your question here"
          variant="outlined"
          value={question}
          onChange={handleQuestionChange}
        />
      </Box>

      <Button variant="contained" onClick={handleQuestionSubmit}>
        Submit Question
      </Button>
    </div>
  );
}
