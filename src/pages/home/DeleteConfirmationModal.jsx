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

export default function DeleteConfirmationModal({
    open,
    handleClose,
    handleConfirmDeletePoll,
}) {
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
                    onClick={() => handleConfirmDeletePoll(true)}
                    color="error"
                    variant="contained"
                >
                    Yes, delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
