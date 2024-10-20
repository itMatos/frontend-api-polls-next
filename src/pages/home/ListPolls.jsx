'use client';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import * as ApiPolls from '../../app/services/BeuniPollsApi';
import { useRouter } from 'next/router';
import PollIcon from '@mui/icons-material/Poll';
import { User_Data } from '../../context/UserContext';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import CardPoll from './CardPoll';

export default function ListPolls() {
    const router = useRouter();
    const { userId } = useContext(User_Data);
    const [polls, setPolls] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userVotes, setUserVotes] = useState([]);

    const handleClickEditPoll = (pollId) => {
        router.push(`/polls/${pollId}`);
    };

    const handleDelete = () => {
        setOpenDeleteModal(false);
    };

    const handleClickMenuDelete = () => {
        setOpenDeleteModal(true);
    };

    useEffect(() => {
        if (!polls.length) {
            ApiPolls.getPolls().then((polls) => {
                setPolls(polls);
            });
        }
    }, [polls.length]);

    useEffect(() => {
        if (userId) {
            ApiPolls.getUserVotedPolls(userId).then((votes) => {
                setUserVotes(votes);
            });
        }
    }, [userId]);

    const handleUpdatePolls = async () => {
        const votes = await ApiPolls.getUserVotedPolls(userId);
        setUserVotes(votes);
    };

    return (
        <>
            <Grid2 container spacing={2} justifyContent={'center'}>
                <Grid2 item flexDirection={'column'}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box display={'flex'} alignItems={'center'} p={2} m={2}>
                            <PollIcon />
                            <Typography variant="h4" sx={{ ml: 2 }}>
                                Current Polls
                            </Typography>
                        </Box>
                        <Box
                            sx={{ mt: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            {polls.length === 0 && (
                                <Paper
                                    sx={{
                                        width: '100%',
                                        p: 2,
                                        m: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <FilterListOffIcon />
                                    <Typography variant="h6">
                                        No polls available
                                    </Typography>
                                </Paper>
                            )}
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} justifyContent={'center'}>
                {polls.length > 0 &&
                    polls?.map((poll) => {
                        return (
                            <CardPoll
                                key={poll.poll_id}
                                poll={poll}
                                userVotes={userVotes}
                                handleClickMenuDelete={handleClickMenuDelete}
                                handleUpdatePolls={handleUpdatePolls}
                                openDeleteModal={openDeleteModal}
                                handleDelete={handleDelete}
                                handleClickEditPoll={handleClickEditPoll}
                                userId={userId}
                                setPolls={setPolls}
                            />
                        );
                    })}
            </Grid2>
        </>
    );
}
