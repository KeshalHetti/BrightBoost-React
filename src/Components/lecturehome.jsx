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
                        Welcome to BrightBoost Lecture
                    </h1>
                </div>
            </div>

            <div className='student-boxcontainer'>
                {/* Create a grid for the content */}
                <div className="student-grid">
                    {/* Start of Card 01 */}
                    <Box>
                        <Card className='student-card'>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Profile
                                </Typography>
                                <CardActions>
                                    <Button size="small">View Page</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* End of Card 01 */}

                    {/* Start of Card 02 */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Answer the Question
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* End of Card 02*/}

                    {/* Start of Card 03 */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Record Student Attendence
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* End of Card 03 */}

                    {/* Start of Card 04 */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Notifications
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* End of Card 04 */}
                </div>
            </div>
        </div>

    )
}

export default Home;
