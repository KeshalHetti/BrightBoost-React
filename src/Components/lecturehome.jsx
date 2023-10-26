import React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist';
const Home = () => {
    const navigate = useNavigate()
    const studentAttendance = () => {
        navigate('/StudentAttendance')
    }
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Welcome to BrightBoost Lecture
                    </h1>
                </div>
            </div>

            <div className='student-boxcontainer'>
                <div className="student-grid">
                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Profile
                                </Typography>
                                <CardActions>
                                    <Link to="/lectureprofile"><Button size="small">View Page</Button></Link>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Answer the Question
                                </Typography>
                                <CardActions>
                                    <Link to="/lectureanswer"><Button size="small">View Page</Button></Link>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Record Student Attendence
                                </Typography>
                                <CardActions>
                                    <Button size="small" onClick={(studentAttendance)}>View Page</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Timetable
                                </Typography>
                                <CardActions>
                                    <Link to="/tutorschedule"><Button size="small">View Page</Button></Link>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </div>
        </div>

    )
}

export default Home;
