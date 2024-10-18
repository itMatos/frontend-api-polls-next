'use client';
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
// import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NewPoll() {
    const [clickNewPoll, setClickNewPoll] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (clickNewPoll) {
            router.push('/polls');
        }
    }, [clickNewPoll]);

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={
                        <Typography variant="h5">Create New Poll</Typography>
                    }
                    subheader="Let's go!"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        Do you need a new poll? Click the button below to create
                        a new poll
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setClickNewPoll(true)}
                    >
                        Create New Poll
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
