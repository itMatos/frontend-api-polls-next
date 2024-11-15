import React, { useState, useEffect } from 'react';
import {
    CardContent,
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    Button,
    Checkbox,
    Grid2,
} from '@mui/material';
import * as ApiPolls from '../../app/services/SurveyProPollsApi';
import CheckIcon from '@mui/icons-material/Check';

export default function PollVoting({
    poll,
    userVotesForPoll = [],
    handleUpdatePolls,
    userId,
}) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    // const userId = 'e404e76b-7162-4109-b4e2-e92085b97d9e';
    const [userVotes, setUserVotes] = useState(userVotesForPoll);

    useEffect(() => {
        if (userVotesForPoll.length > 0) {
            setSelectedAnswers(userVotesForPoll.map((vote) => vote.answer));
        }
    }, [userVotesForPoll]);

    const fetchUserVotes = async () => {
        const votes = await ApiPolls.getUserVotedPolls(userId);
        setUserVotes(votes);
    };

    const handleToggle = (answerOption) => {
        if (poll.mult_choice) {
            const currentIndex = selectedAnswers.indexOf(answerOption);
            const newSelectedAnswers = [...selectedAnswers];

            if (currentIndex === -1) {
                newSelectedAnswers.push(answerOption);
            } else {
                newSelectedAnswers.splice(currentIndex, 1);
            }

            setSelectedAnswers(newSelectedAnswers);
        } else {
            setSelectedAnswers([answerOption]);
        }
    };

    const handleSubmitVote = async () => {
        try {
            if (poll.mult_choice) {
                for (const answer of selectedAnswers) {
                    await ApiPolls.votePoll({
                        poll_id: poll.poll_id,
                        user_id: userId,
                        answer: answer,
                    });
                }
            } else {
                if (selectedAnswers.length === 1) {
                    await ApiPolls.votePoll({
                        poll_id: poll.poll_id,
                        user_id: userId,
                        answer: selectedAnswers[0],
                    });
                }
            }
            fetchUserVotes();
            handleUpdatePolls();
        } catch (error) {
            console.log('Erro ao enviar votação.');
        }
    };

    useEffect(() => {
        setUserVotes(userVotesForPoll);
    }, [userVotesForPoll]);

    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
            <CardContent>
                <List
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            {poll.mult_choice
                                ? 'Multiple Choice'
                                : 'Single Choice'}
                        </ListSubheader>
                    }
                >
                    {poll.answerOptions?.map((answerOption) => (
                        <ListItem key={answerOption} disablePadding>
                            <ListItemButton
                                role={undefined}
                                onClick={() => handleToggle(answerOption)}
                                disabled={userVotes.length > 0}
                                dense
                            >
                                <Checkbox
                                    edge="start"
                                    checked={selectedAnswers.includes(
                                        answerOption,
                                    )}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': answerOption,
                                    }}
                                />
                                <Button>{answerOption}</Button>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Grid2 sx={{ textAlign: 'center' }}>
                    <Button
                        variant={
                            userVotes.length > 0 ? 'outlined' : 'contained'
                        }
                        size={userVotes.length > 0 ? 'small' : 'large'}
                        color={userVotes.length > 0 ? 'success' : 'primary'}
                        onClick={userVotes.length > 0 ? null : handleSubmitVote}
                        disableRipple
                        startIcon={userVotes.length > 0 && <CheckIcon />}
                    >
                        {userVotes.length > 0
                            ? 'You already voted this poll'
                            : 'Vote'}
                    </Button>
                </Grid2>
            </CardContent>
        </Grid2>
    );
}
