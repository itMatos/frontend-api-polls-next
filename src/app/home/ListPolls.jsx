'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
import * as ApiPolls from '../services/BeuniPollsApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useRouter } from 'next/router';
import PollVoting from './PollVoting';
import PollIcon from '@mui/icons-material/Poll';

export default function ListPolls({
    userId = 'e404e76b-7162-4109-b4e2-e92085b97d9e',
}) {
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
        if (!polls.length) {
            ApiPolls.getPolls().then((data) => {
                setPolls(data);
            });
        }
    }, [polls.length]);

    const fetchUserVotes = async () => {
        const votes = await ApiPolls.getUserVotedPolls(userId);
        setUserVotes(votes);
    };

    useEffect(() => {
        fetchUserVotes();
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
        fetchUserVotes();
    };

    return (
        <Grid2>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Current Polls</Typography>
                {polls.length === 0 && (
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <PollIcon />
                        <Typography variant="h6">No polls available</Typography>
                    </Paper>
                )}
            </Box>

            {polls.length > 0 &&
                polls.map((poll) => {
                    const userVotesForPoll = getUserVotesForPoll(poll.poll_id);

                    return (
                        <Card key={poll.poll_id} m={2} p={2}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="poll-author">R</Avatar>
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
                            />
                        </Card>
                    );
                })}
        </Grid2>
    );
}
