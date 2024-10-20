'use client';
import React, { useContext, useMemo } from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid2,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { User_Data } from '../../context/UserContext';
import getRandomColor from '../../app/colors/RandomColor';

export default function NewPoll() {
    const router = useRouter();
    const { userName } = useContext(User_Data);
    const randomColor = useMemo(getRandomColor);

    return (
        <Grid2 container justifyContent="center" sx={{ my: 4 }}>
            <Grid2 item xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ mb: 2 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: randomColor }}
                                aria-label="recipe"
                            >
                                {userName ? userName[0] : 'U'}
                            </Avatar>
                        }
                        title={
                            <Typography variant="h5">
                                Create New Poll
                            </Typography>
                        }
                        subheader="Let's go!"
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            Do you need a new poll? Click the button below to
                            create a new poll
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => router.push('/polls')}
                        >
                            Create New Poll
                        </Button>
                    </CardActions>
                </Card>
            </Grid2>
        </Grid2>
    );
}
