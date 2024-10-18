'use client';

import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import * as ApiPolls from '../services/BeuniPollsApi';

export default function DeleteConfirmationModal({
    open,
    handleClose,
    setPolls,
    pollId,
}) {
    const handleConfirmDeletePoll = () => {
        try {
            ApiPolls.deletePoll(pollId).then(() => {
                ApiPolls.getPolls().then((data) => {
                    setPolls(data);
                });
            });
        } catch (error) {
            console.error('Error deleting poll', error);
        } finally {
            handleClose(true);
        }
    };
    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle id="confirm-delete-title">
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-delete-description">
                    Are you sure you want to delete this poll? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose(false)}
                    color="primary"
                    autoFocus
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleConfirmDeletePoll()}
                    color="error"
                    variant="contained"
                >
                    Yes, delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
