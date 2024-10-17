'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import * as ApiPolls from '../services/BeuniPollsApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

export default function ListPolls() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        if (!polls.length)
            ApiPolls.getPolls().then((data) => {
                setPolls(data);
            });
    }, [polls.length]);

    return (
        <>
            {polls.length &&
                polls.map((poll) => (
                    <Card key={poll.id} m={2} p={2}>
                        <CardHeader
                            avatar={<Avatar aria-label="poll-author">R</Avatar>}
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={poll.title}
                            subheader={poll.description}
                        />

                        <CardContent>
                            <List>
                                {poll.answerOptions?.map((answerOption) => (
                                    <ListItem key={answerOption} disablePadding>
                                        <ListItemButton
                                            role={undefined}
                                            // onClick={handleToggle(value)}
                                            dense
                                        >
                                            {/* <ListItemIcon>
                <Checkbox
                  edge="start"
                //   checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': answerOption }}
                />
              </ListItemIcon> */}
                                            {/* <ListItemText id={answerOption} primary={`${answerOption}`} /> */}
                                            <Button id={answerOption}>
                                                {answerOption}
                                            </Button>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}
