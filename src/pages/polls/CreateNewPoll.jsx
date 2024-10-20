import React, { useEffect, useState } from 'react';

import {
    Alert,
    Button,
    Container,
    Grid2,
    Slide,
    Typography,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as ApiPolls from './../../app/services/BeuniPollsApi';
import { useRouter } from 'next/router';
import PollToolbar from './PollToolbar';
import PollForm from './PollForm';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function PollMaker({ isEditing = false, pollIdToEdit = null }) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [multChoice, setMultChoice] = useState(false);
    const [duplicateIndices, setDuplicateIndices] = useState([]);
    const [error, setError] = useState('');
    const [state, setState] = useState({
        open: false,
        Transition: SlideTransition,
    });
    const [createdPoll, setCreatedPoll] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [payloadToCompare, setPayloadToCompare] = useState(null);

    const handleTitleChange = ({ target }) => setTitle(target.value);
    const handleDescriptionChange = ({ target }) =>
        setDescription(target.value);

    const addOption = () => {
        const newOptions = [...options, ''];
        checkDuplicates(newOptions);
        setOptions(newOptions);
    };

    const handleShowSnackBar = (Transition) => () => {
        setState({
            open: true,
            Transition,
        });
    };

    const handleCloseSnackbar = () => {
        setState({
            ...state,
            open: false,
        });
        setError('');
    };

    const checkDuplicates = (options) => {
        const duplicates = [];
        options.forEach((option, index) => {
            if (option && options.indexOf(option) !== index) {
                duplicates.push(index);
            }
        });
        setDuplicateIndices(duplicates);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
        checkDuplicates(newOptions);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        checkDuplicates(newOptions);
    };

    const moveOptionUp = (index) => {
        if (index === 0) return;
        const newOptions = [...options];
        [newOptions[index - 1], newOptions[index]] = [
            newOptions[index],
            newOptions[index - 1],
        ];
        setOptions(newOptions);
    };

    const moveOptionDown = (index) => {
        if (index === options.length - 1) return;
        const newOptions = [...options];
        [newOptions[index + 1], newOptions[index]] = [
            newOptions[index],
            newOptions[index + 1],
        ];
        setOptions(newOptions);
    };

    const handleMultChoiceToggle = () => setMultChoice(!multChoice);

    const handleValidateForm = () => {
        const trimOptions = options.map((option) => option.trim());
        const validOptions = trimOptions.filter((option) => option.length > 0);
        checkDuplicates(validOptions);
        validOptions.length < 2 ? null : setOptions(validOptions);
        const trimmedTitle = title.trim();
        setTitle(trimmedTitle);
        setIsFormValid(false);

        setError('');

        if (!title || !trimmedTitle) {
            setError('Title is required');
            handleShowSnackBar(SlideTransition)();
            setHasError(true);
            return;
        } else if (validOptions.length < 2) {
            setError('You need at least two options to create a poll');
            handleShowSnackBar(SlideTransition)();
            setHasError(true);
            return;
        } else if (duplicateIndices.length > 0) {
            setError('Duplicate options are not allowed');
            handleShowSnackBar(SlideTransition)();
            setHasError(true);
            return;
        } else if (options.length !== validOptions.length) {
            setError('Options cannot be empty');
            handleShowSnackBar(SlideTransition)();
            return;
        } else {
            setIsFormValid(true);
            return;
        }
    };

    const handleCreatePoll = async () => {
        const payload = {
            title: title,
            description: description,
            mult_choice: multChoice,
            answer_options: options,
        };
        try {
            const createPoll = await ApiPolls.createPoll(payload);
            const { status } = createPoll;
            if (status === 201) {
                setCreatedPoll(true);
            }
        } catch (error) {
            setError('Error creating poll');
            handleShowSnackBar(SlideTransition)();
        }
    };

    const handleUpdatePoll = async () => {
        const payload = {};
        if (description !== payloadToCompare?.description) {
            payload.description = description;
        }
        if (title !== payloadToCompare?.title) {
            payload.title = title;
        }
        if (options !== payloadToCompare?.answerOptions) {
            payload.answerOptions = options;
        }
        try {
            const updatePoll = await ApiPolls.updatePoll(pollIdToEdit, payload);
            const { status } = updatePoll;
            if (status === 200) {
                setCreatedPoll(true);
            }
        } catch (error) {
            setError('Error updating poll');
            handleShowSnackBar(SlideTransition)();
        }
    };

    useEffect(() => {
        if (isFormValid) {
            isEditing ? handleUpdatePoll() : handleCreatePoll();
        }
    }, [isFormValid]);

    useEffect(() => {
        if (createdPoll) {
            router.push('/home');
        }
    }, [createdPoll, router]);

    useEffect(() => {
        if (isEditing && pollIdToEdit) {
            ApiPolls.getPollById(pollIdToEdit).then((data) => {
                setPayloadToCompare(data);
                setTitle(data.title);
                setDescription(data.description);
                setOptions(data.answerOptions);
                setMultChoice(data.mult_choice);
            });
        }
    }, [pollIdToEdit, isEditing]);

    return (
        <>
            <PollToolbar barName={isEditing ? 'Edit Poll' : 'Create Poll'} />
            <Container maxWidth="md" sx={{ padding: '16px' }}>
                <Typography variant="h4" align="center" gutterBottom mt={2}>
                    {isEditing ? 'Edit Poll' : 'Create Poll'}
                </Typography>

                <PollForm
                    title={title}
                    description={description}
                    options={options}
                    multChoice={multChoice}
                    onTitleChange={handleTitleChange}
                    onDescriptionChange={handleDescriptionChange}
                    onOptionChange={handleOptionChange}
                    onOptionRemove={removeOption}
                    onOptionAdd={addOption}
                    onMoveOptionUp={moveOptionUp}
                    onMoveOptionDown={moveOptionDown}
                    onMultChoiceToggle={handleMultChoiceToggle}
                    canAddOption={options.length < 10}
                    duplicateIndices={duplicateIndices}
                    hasError={hasError}
                    isEditing={isEditing}
                />

                <Grid2 container justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidateForm}
                    >
                        {isEditing ? 'Save Poll' : 'Create Poll'}
                    </Button>
                </Grid2>

                <Snackbar
                    open={!!error}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                    sx={{ justifyContent: 'center' }}
                >
                    <Alert severity="error" variant="filled">
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}
