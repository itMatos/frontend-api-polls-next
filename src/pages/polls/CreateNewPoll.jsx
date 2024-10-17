import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Snackbar from "@mui/material/Snackbar";
import * as ApiPolls from "./../../app/services/BeuniPollsApi";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CreateNewPoll() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [multChoice, setMultChoice] = useState(false);
  const [duplicateIndices, setDuplicateIndices] = useState([]);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });

  const handleTitle = ({ target }) => setTitle(target.value);
  const handleDescription = ({ target }) => setDescription(target.value);

  const addOption = () => {
    const newOptions = [...options, ""];
    checkDuplicates(newOptions);
    setOptions(newOptions);
  };

  const handleSnackBar = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    setError("");
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

  const handleMultChoiceSwitch = () => setMultChoice(!multChoice);

  const handleCreatePoll = async () => {
    const validOptions = options.filter((option) => option);
    const validOptionsTrimmed = validOptions.map((option) => option.trim());
    checkDuplicates(validOptionsTrimmed);

    if (!title) {
      setError("Title is required");
      handleSnackBar(SlideTransition)();
      return;
    } else if (validOptions.length < 2) {
      setError("You need at least two options to create a poll");
      handleSnackBar(SlideTransition)();
      return;
    } else if (duplicateIndices.length > 0) {
      setOptions(validOptionsTrimmed);
      handleSnackBar(SlideTransition)();
      return;
    } else if (validOptionsTrimmed.length !== options.length) {
      setError("You have empty options");
      setOptions(validOptionsTrimmed);
      handleSnackBar(SlideTransition)();
      return;
    } else {
      setError("");
      const payload = {
        title,
        description,
        mult_choice: multChoice,
        answer_options: validOptionsTrimmed,
      };
      try {
        const createPoll = await ApiPolls.createPoll(payload);
        const { status, data } = createPoll;
        console.log("status", status);
      } catch (error) {
        console.error("Error creating poll", error);
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create New Poll
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={2}>
        <Box sx={{ p: 2 }}>
          <Grid2 size={{ sm: 12 }}>
            <TextField
              id="title-field"
              label="Title"
              variant="outlined"
              multiline
              error={error.length > 0}
              fullWidth
              value={title}
              onChange={handleTitle}
              sx={{ mb: 2 }}
            />
            <TextField
              id="description-field"
              label="Description (optional)"
              variant="outlined"
              multiline
              fullWidth
              value={description}
              onChange={handleDescription}
              sx={{ mb: 2 }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12 }}>
            {options.map((option, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flex: 1,
                }}
              >
                <TextField
                  id={`option-${index}`}
                  label={`Option ${index + 1}`}
                  variant="standard"
                  multiline
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ mr: 2 }}
                  error={duplicateIndices.includes(index)}
                  helperText={
                    duplicateIndices.includes(index) ? "Duplicate option" : ""
                  }
                />
                <IconButton
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 2}
                >
                  <DeleteIcon
                    color={options.length <= 2 ? "disabled" : "error"}
                  />
                </IconButton>
                <IconButton
                  variant="contained"
                  size="small"
                  onClick={() => moveOptionUp(index)}
                  disabled={index === 0}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  variant="standard"
                  size="small"
                  onClick={() => moveOptionDown(index)}
                  disabled={index === options.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Box>
            ))}
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center" }}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={addOption}
                disabled={options.length >= 10 || duplicateIndices.length}
              >
                Add Option
              </Button>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={multChoice}
                      onChange={handleMultChoiceSwitch}
                    />
                  }
                  label="Allow multiple choices"
                  sx={{ alignSelf: "center" }}
                />
              </FormGroup>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePoll}
              sx={{ mt: 2 }}
              disabled={duplicateIndices.length > 0 || error.length > 0}
            >
              Create poll
            </Button>
          </Grid2>

          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            key={state.Transition.name}
            autoHideDuration={6000}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Grid2>
    </>
  );
}
