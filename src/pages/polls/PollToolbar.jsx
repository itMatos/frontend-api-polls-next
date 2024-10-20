import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

function PollToolbar({ barName }) {
    const router = useRouter();
    const handleClickBackButton = () => {
        router.push('/home');
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ff6200' }} m={0}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={handleClickBackButton}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {barName}
                </Typography>
                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    );
}

export default PollToolbar;
