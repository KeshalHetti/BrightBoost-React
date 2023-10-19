import React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/main-01.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material'

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
                    <p className="primary-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor accumsan ante eu accumsan.
                    </p>
                    <div>
                        {/* Start of Card 01 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Profile
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 01 */}

                        {/* Start of Card 02 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Timetable
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 02 */}

                        {/* Start of Card 03 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Ask a Question
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 03 */}

                        {/* Start of Card 04 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Feedback & Survey
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 04 */}

                        {/* Start of Card 05 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Notifications
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 05 */}

                        {/* Start of Card 06 */}
                        <Box width='300px'>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        Attendance
                                    </Typography>
                                    {/* <Typography gutterBottom variant='h5' component='div'>
                                    Navigate to view the session Timetable.
                                </Typography> */}
                                </CardContent>
                            </Card>
                        </Box>
                        {/* End of Card 06 */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home