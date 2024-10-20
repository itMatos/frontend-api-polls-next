'use client';
import {
    Avatar,
    Card,
    CardHeader,
    Grid2,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import PollVoting from './PollVoting';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getRandomColor from '../../app/colors/RandomColor';
import EditIcon from '@mui/icons-material/Edit';
import * as ApiPolls from '../../app/services/BeuniPollsApi';

export default function CardPoll({
    poll,
    userVotes,
    handleClickMenuDelete,
    handleUpdatePolls,
    setPolls,
    userId,
    openDeleteModal,
    handleDelete,
    handleClickEditPoll,
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const getUserVotesForPoll = (pollId) => {
        const votes = userVotes.filter((vote) => vote.poll_id === pollId);
        return votes;
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [randomColor] = useState(getRandomColor());

    const userVotesForPoll = getUserVotesForPoll(poll.poll_id);

    const handleConfirmDeletePoll = () => {
        ApiPolls.deletePoll(poll.poll_id).then(() => {
            ApiPolls.getPolls().then((data) => {
                setPolls(data);
                handleDelete(false);
            });
        });
    };

    return (
        <Grid2
            item
            key={poll.poll_id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
            justifyContent="center"
            sx={{
                display: 'flex',
                height: '100%',
            }}
        >
            <Card
                key={poll.poll_id}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    minWidth: '400px',
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="poll-author"
                            sx={{
                                bgcolor: randomColor,
                            }}
                        >
                            B
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
                                    onClick={() => {
                                        handleClickEditPoll(poll.poll_id);
                                        handleMenuClose();
                                    }}
                                    key="item-edit"
                                >
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>

                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClickMenuDelete(poll.poll_id);
                                        handleMenuClose();
                                    }}
                                    key="item-delete"
                                >
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </Menu>
                            <DeleteConfirmationModal
                                open={openDeleteModal}
                                handleClose={handleDelete}
                                pollId={poll.poll_id}
                                handleConfirmDeletePoll={
                                    handleConfirmDeletePoll
                                }
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
}
