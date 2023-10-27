import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Container, Typography, List, ListItem, Grid } from '@mui/material';
import { db } from '../config/firebase';
import { Chart, ArcElement } from 'chart.js';
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const AdminHome = () => {
    Chart.register(ArcElement);

    const [userData, setUserData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    useEffect(() => {
        const q = query(
            collection(db, "users"),
            orderBy("logins", "desc"),
            limit(5)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                email: doc.data().email,
                logins: doc.data().logins
            }));
            setUserData(data);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const qnaCollection = collection(db, 'qna');
            const qnaSnapshot = await getDocs(qnaCollection);
            const responseTimes = {};

            qnaSnapshot.forEach(doc => {
                const email = doc.data().emailanswered;
                const responseTime = doc.data().timetaken;

                if (!responseTimes[email]) {
                    responseTimes[email] = { total: 0, count: 0 };
                }
                responseTimes[email].total += responseTime;
                responseTimes[email].count += 1;
            });

            const averages = Object.keys(responseTimes).map(email => ({
                email,
                average: responseTimes[email].total / responseTimes[email].count
            })).sort((a, b) => a.average - b.average).slice(0, 5);

            setResponseData(averages);
        };

        fetchData();
    }, []);

    const loginData = {
        labels: userData.map(user => user.email),
        datasets: [{
            data: userData.map(user => user.logins),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };

    const chartData = {
        labels: responseData.map(item => item.email),
        datasets: [{
            data: responseData.map(item => item.average),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        Top 5 Most Logged-In Users
                    </Typography>
                    <Pie data={loginData} />
                    <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                        Users:
                    </Typography>
                    <List>
                        {userData.map((user, index) => (
                            <ListItem key={user.email}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: loginData.datasets[0].backgroundColor[index],
                                    marginRight: '10px',
                                    display: 'inline-block'
                                }}>
                                </div>
                                {user.email} - {user.logins} logins
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        Top 5 Lecturers with Best Response Time
                    </Typography>
                    <Pie data={chartData} />
                    <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                        Lecturers:
                    </Typography>
                    <List>
                        {responseData.map(item => (
                            <ListItem key={item.email}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: chartData.datasets[0].backgroundColor[responseData.indexOf(item)],
                                    marginRight: '10px',
                                    display: 'inline-block'
                                }}>
                                </div>
                                {item.email} - Average Response Time: {Math.floor((item.average / 1000) / 60)} mins
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminHome;
