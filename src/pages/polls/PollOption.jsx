import React from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function PollOption({
    index,
    value,
    onChange,
    onRemove,
    onMoveUp,
    onMoveDown,
    canRemove,
    canMoveUp,
    canMoveDown,
    isDuplicate,
}) {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label={`Option ${index + 1}`}
                    variant="standard"
                    multiline
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(index, e.target.value)}
                    sx={{ mr: 2 }}
                    error={isDuplicate}
                    helperText={isDuplicate ? 'Duplicate option' : ''}
                />
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => onRemove(index)}
                    disabled={!canRemove}
                >
                    <DeleteIcon color={!canRemove ? 'disabled' : 'error'} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => onMoveUp(index)}
                    disabled={!canMoveUp}
                >
                    <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => onMoveDown(index)}
                    disabled={!canMoveDown}
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </Box>
        </>
    );
}

export default PollOption;
