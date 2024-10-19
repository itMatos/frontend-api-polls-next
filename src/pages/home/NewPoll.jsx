'use client';
import React, { useEffect, useState } from 'react';
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

export default function NewPoll({ userId, name }) {
    const [clickNewPoll, setClickNewPoll] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleNavigation = async () => {
            if (clickNewPoll) {
                await router.push({
                    pathname: '/polls',
                    query: {
                        userId: userId,
                        name: name,
                        isEditing: false,
                        pollId: null,
                    },
                });
            }
        };
        handleNavigation();
    }, [clickNewPoll, router, userId, name]);

    return (
        <Grid2 container justifyContent="center" sx={{ my: 4 }}>
            <Grid2 item xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ mb: 2 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                                {name ? name[0] : 'U'}
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
                            onClick={() => setClickNewPoll(true)}
                        >
                            Create New Poll
                        </Button>
                    </CardActions>
                </Card>
            </Grid2>
        </Grid2>
    );
}
