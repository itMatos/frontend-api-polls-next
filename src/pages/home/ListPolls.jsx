'use client';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Grid2,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import * as ApiPolls from '../../app/services/BeuniPollsApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useRouter } from 'next/router';
import PollVoting from './PollVoting';
import PollIcon from '@mui/icons-material/Poll';
import { User_Data } from '../../context/UserContext';

// eslint-disable-next-line no-unused-vars
export default function ListPolls() {
    const { userId } = useContext(User_Data);
    const [polls, setPolls] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [pollIdToEdit, setPollIdToEdit] = useState('');
    const router = useRouter();
    const [userVotes, setUserVotes] = useState([]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickEditPoll = (pollId) => {
        handleMenuClose();
        setPollIdToEdit(pollId);
    };

    const handleDelete = async () => {
        setOpenDeleteModal(false);
    };

    const handleClickMenuDelete = () => {
        handleMenuClose();
        setOpenDeleteModal(true);
    };

    useEffect(() => {
        const fetchPolls = async () => {
            if (!polls.length) {
                const data = await ApiPolls.getPolls();
                setPolls(data);
            }
        };
        fetchPolls();
    }, [polls.length]);

    useEffect(() => {
        const fetchUserVotes = async () => {
            const votes = await ApiPolls.getUserVotedPolls(userId);
            setUserVotes(votes);
        };
        if (userId) {
            fetchUserVotes();
        }
    }, [userId]);

    useEffect(() => {
        if (pollIdToEdit) {
            router.push(`/polls/${pollIdToEdit}`);
        }
    }, [pollIdToEdit, router]);

    const getUserVotesForPoll = (pollId) => {
        return userVotes.filter((vote) => vote.poll_id === pollId);
    };

    const handleUpdatePolls = async () => {
        const votes = await ApiPolls.getUserVotedPolls(userId);
        setUserVotes(votes);
    };

    return (
        <Grid2 container spacing={2} justifyContent={'center'}>
            <Grid2
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4">Current Polls</Typography>
                {polls.length === 0 && (
                    <Paper sx={{ width: '100%', p: 2, m: 2 }}>
                        <Box sx={{ width: '100%' }}>
                            <PollIcon />
                            <Typography variant="h6">
                                No polls available
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </Grid2>
            {polls.length > 0 &&
                polls.map((poll) => {
                    const userVotesForPoll = getUserVotesForPoll(poll.poll_id);

                    return (
                        <Grid2
                            item
                            key={poll.poll_id}
                            sx={{ alignContent: 'center' }}
                        >
                            <Card
                                key={poll.poll_id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                                m={2}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="poll-author">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <>
                                            <IconButton
                                                aria-label="settings"
                                                onClick={handleMenuOpen}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                                sx={{
                                                    '& .MuiPaper-root': {
                                                        boxShadow: 'none',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                    },
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleClickEditPoll(
                                                            poll.poll_id,
                                                        )
                                                    }
                                                    key="item-edit"
                                                >
                                                    <ListItemIcon>
                                                        <EditIcon fontSize="small" />
                                                    </ListItemIcon>

                                                    <ListItemText>
                                                        Edit
                                                    </ListItemText>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleClickMenuDelete(
                                                            poll.poll_id,
                                                        )
                                                    }
                                                    key="item-delete"
                                                >
                                                    <ListItemIcon>
                                                        <DeleteIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        Delete
                                                    </ListItemText>
                                                </MenuItem>
                                            </Menu>
                                            <DeleteConfirmationModal
                                                open={openDeleteModal}
                                                handleClose={handleDelete}
                                                setPolls={setPolls}
                                                pollId={poll.poll_id}
                                            />
                                        </>
                                    }
                                    title={poll.title}
                                    subheader={poll.description}
                                />

                                <PollVoting
                                    poll={poll}
                                    userVotesForPoll={userVotesForPoll}
                                    handleUpdatePolls={handleUpdatePolls}
                                    userId={userId}
                                    sx={{ flexGrow: 1 }}
                                />
                            </Card>
                        </Grid2>
                    );
                })}
        </Grid2>
    );
}
