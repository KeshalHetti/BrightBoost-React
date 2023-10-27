import React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Welcome to BrightBoost Student
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
                                    <Link to="/studentprofile"><Button size="small">View Page</Button></Link>
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
                                    <Link to="/stimetable"><Button size="small">View Page</Button></Link>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Ask a Question
                                </Typography>
                                <CardActions>
                                    <Link to="/stquestion"><Button size="small">View Page</Button></Link>
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
