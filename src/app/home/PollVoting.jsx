import React, { useState } from 'react';
import {
    CardContent,
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    Button,
    Checkbox,
} from '@mui/material';
import * as ApiPolls from '../services/BeuniPollsApi';

export default function PollVoting({ poll }) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const userId = 'e404e76b-7162-4109-b4e2-e92085b97d9e';

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
        console.log('poll', poll);
        const paylaod = {
            poll_id: poll.poll_id,
            user_id: userId,
            answer: selectedAnswers[0],
        };
        console.log('payload', paylaod);
        try {
            console.log('poll', poll);
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
            alert('Votação enviada com sucesso!');
        } catch (error) {
            alert('Erro ao enviar votação.');
        }
    };

    return (
        <CardContent>
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {poll.mult_choice ? 'Multiple Choice' : 'Single Choice'}
                    </ListSubheader>
                }
            >
                {poll.answerOptions?.map((answerOption) => (
                    <ListItem key={answerOption} disablePadding>
                        <ListItemButton
                            role={undefined}
                            onClick={() => handleToggle(answerOption)}
                            dense
                        >
                            <Checkbox
                                edge="start"
                                checked={selectedAnswers.includes(answerOption)}
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitVote}
                disabled={selectedAnswers.length === 0}
            >
                Vote
            </Button>
        </CardContent>
    );
}
