'use client';
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { User_Data } from './../../context/UserContext';
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';

function HomePage() {
    const router = useRouter();
    const { userName, setUserName } = useContext(User_Data);
    const { setUserEmail } = useContext(User_Data);
    const { setUserId } = useContext(User_Data);

    const handleLogOut = () => {
        googleLogout();
        setUserId(null);
        setUserName(null);
        setUserEmail(null);
        router.push('/');
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ff6200' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        SurveyPro Polls
                    </Typography>
                    <IconButton color="inherit" onClick={() => handleLogOut()}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{ mt: 4 }}
            >
                Welcome to SurveyPro Polls, {userName}!
            </Typography>
        </>
    );
}

export default HomePage;
