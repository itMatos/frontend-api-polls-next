'use client';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from '@mui/material';
import NewPoll from './NewPoll';
import ListPolls from './ListPolls';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';
import { googleLogout } from '@react-oauth/google';

export default function Home() {
    const router = useRouter();
    let { userId } = router.query || {};
    const { name } = router.query || {};
    const [clickExit, setClickExit] = useState(false);

    const logOut = async () => {
        setClickExit(true);
        googleLogout();
    };

    useEffect(() => {
        if (clickExit) {
            return router.push('/');
        }
    }, [clickExit, router]);

    return (
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
                    <IconButton color="inherit" onClick={logOut}>
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
                Welcome to Beuni Polls, {name}!
            </Typography>

            <NewPoll userId={userId} name={name} />
            <ListPolls userId={userId} name={name} />
        </>
    );
}
