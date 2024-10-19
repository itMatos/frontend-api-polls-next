import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PollToolbar({ barName }) {
    const handleClickBackButton = () => {
        window.history.back();
    };
    return (
        <AppBar position="static">
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
