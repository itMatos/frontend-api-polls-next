'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import * as ApiPolls from '../services/BeuniPollsApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function ListPolls() {
    const [polls, setPolls] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        // onEdit(poll.id);
    };

    const handleDelete = async () => {
        // if (confirm) {
        //     try {
        //         ApiPolls.getPolls().then((data) => {
        //             setPolls(data);
        //         });
        //     } catch (error) {
        //         console.error('Error deleting poll', error);
        //     } finally {
        //         setOpenDeleteModal(false);
        //     }
        //     console.log('teste aqui');
        // }
        setOpenDeleteModal(false);
        // handleMenuClose();
        // setOpenDeleteModal(true);
    };

    const handleClickMenuDelete = () => {
        handleMenuClose();
        setOpenDeleteModal(true);
    };

    // const handleClickDeletePoll = (pollId) => {
    //     console.log('pollId', pollId);
    //     handleMenuClose();
    //     setOpenDeleteModal(true);
    //     // onDelete(poll.id);
    //     // handleDeleteConfirm(pollId);
    // };

    // const handleCloseModal = async (confirm) => {
    //     setOpenDeleteModal(false);

    //     if (confirm) {
    //         try {
    //             ApiPolls.getPolls().then((data) => {
    //                 setPolls(data);
    //             });
    //         } catch (error) {
    //             console.error('Error deleting poll', error);
    //         } finally {
    //             setOpenDeleteModal(false);
    //         }
    //     }
    // };

    // const handleDeleteConfirm = (pollId) => {
    //     try {
    //         ApiPolls.deletePoll(pollId).then(() => {
    //             setPolls(polls.filter((poll) => poll.id !== pollId));
    //         });
    //     } catch (error) {
    //         console.error('Error deleting poll', error);
    //     } finally {
    //         setOpenDeleteModal(false);
    //     }
    // };

    // const handleDeleteConfirm = () => {
    //     Router.push('/');
    // };

    useEffect(() => {
        if (!polls.length)
            ApiPolls.getPolls().then((data) => {
                setPolls(data);
            });
    }, [polls.length]);

    return (
        <>
            {polls.length > 0 &&
                polls.map((poll) => (
                    <Card key={poll.poll_id} m={2} p={2}>
                        <CardHeader
                            avatar={<Avatar aria-label="poll-author">R</Avatar>}
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
                                            onClick={handleEdit}
                                            key="item-edit"
                                        >
                                            <ListItemIcon>
                                                <EditIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Edit</ListItemText>
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
                                            <ListItemText>Delete</ListItemText>
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
