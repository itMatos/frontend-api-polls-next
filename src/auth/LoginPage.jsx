'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import * as ApiPolls from '../app/services/SurveyProPollsApi';
import { User_Data } from '../context/UserContext';
import brandImage from './../app/img/image.png';
import Image from 'next/image';

function LoginPage() {
    const { userName, setUserName } = useContext(User_Data);
    const { userEmail, setUserEmail } = useContext(User_Data);
    const { setUserId } = useContext(User_Data);
    const { setIsLoggedIn } = useContext(User_Data);

    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    // useEffect(() => {
    //     if (user) {
    //         axios
    //             .get(
    //                 `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json',
    //                     },
    //                 },
    //             )
    //             .then((res) => {
    //                 setUserName(res?.data?.name);
    //                 setUserEmail(res?.data?.email);
    //                 handleNavigation(res?.data?.email);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [user]);

    const handleNavigation = () => {
        router.push('/home');
    };

    useEffect(() => {
        if (userName && userEmail) {
            ApiPolls.getUserInfoByEmail(userEmail).then((userExists) => {
                if (userExists.user_id) {
                    setUserId(userExists.user_id);
                    setIsLoggedIn(true);
                    handleNavigation();
                } else {
                    ApiPolls.createUser({
                        email: userEmail,
                        name: userName,
                    }).then((newUser) => {
                        if (newUser) {
                            ApiPolls.getUserInfoByEmail(userEmail).then(
                                (newUserInfo) => {
                                    setUserId(newUserInfo.user_id);
                                    handleNavigation();
                                },
                            );
                        }
                    });
                }
            });
        }
    }, [userName, userEmail]);

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Image
                        src={brandImage}
                        width="50px"
                        height="50px"
                        alt="Brand Logo"
                    />

                    <Typography variant="h5" align="center" mt={2}>
                        Welcome to SurveyPro Polls!
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<GoogleIcon />}
                            onClick={login}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: '#ff6200',
                                mt: 2,
                                '&:hover': {
                                    backgroundColor: '#ef6c00',
                                },
                            }}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;
