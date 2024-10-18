import React from 'react';
import {
    TextField,
    Button,
    Box,
    FormControlLabel,
    FormGroup,
    Switch,
} from '@mui/material';
import PollOption from './PollOption';

export default function PollForm({
    title,
    description,
    options,
    multChoice,
    onTitleChange,
    onDescriptionChange,
    onOptionChange,
    onOptionRemove,
    onOptionAdd,
    onMoveOptionUp,
    onMoveOptionDown,
    onMultChoiceToggle,
    canAddOption,
    duplicateIndices,
    hasError,
}) {
    return (
        <Box sx={{ p: 2 }}>
            <TextField
                label="Title"
                variant="outlined"
                multiline
                fullWidth
                value={title}
                onChange={onTitleChange}
                sx={{ mb: 2 }}
                error={title.trim().length === 0 && hasError}
            />
            <TextField
                label="Description (optional)"
                variant="outlined"
                multiline
                fullWidth
                value={description}
                onChange={onDescriptionChange}
                sx={{ mb: 2 }}
            />

            {options.map((option, index) => (
                <PollOption
                    key={index}
                    index={index}
                    value={option}
                    onChange={onOptionChange}
                    onRemove={onOptionRemove}
                    onMoveUp={onMoveOptionUp}
                    onMoveDown={onMoveOptionDown}
                    canRemove={options.length > 2}
                    canMoveUp={index > 0}
                    canMoveDown={index < options.length - 1}
                    isDuplicate={duplicateIndices.includes(index)}
                />
            ))}

            <Button
                variant="contained"
                color="primary"
                onClick={onOptionAdd}
                disabled={!canAddOption}
            >
                Add Option
            </Button>

            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={multChoice}
                            onChange={onMultChoiceToggle}
                        />
                    }
                    label="Allow multiple answers"
                    sx={{ mt: 2 }}
                />
            </FormGroup>
        </Box>
    );
}
