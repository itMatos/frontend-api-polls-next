'use client';
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { User_Data } from './../../context/UserContext';
import NewPoll from './NewPoll';
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
import ListPolls from './ListPolls';

function HomePage() {
    const router = useRouter();
    const { userName, setUserName } = useContext(User_Data);
    const { setUserEmail } = useContext(User_Data);
    const { setUserId } = useContext(User_Data);

    const handleLogOut = async () => {
        googleLogout();
        setUserId(null);
        setUserName(null);
        setUserEmail(null);
        router.push('/');
    };

    return (
        <>
            <>
                <AppBar position="static">
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
                            Beuni Polls
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={() => handleLogOut()}
                        >
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
                    Welcome to Beuni Polls, {userName}!
                </Typography>
            </>

            <NewPoll />
            <ListPolls />
        </>
    );
}

export default HomePage;
