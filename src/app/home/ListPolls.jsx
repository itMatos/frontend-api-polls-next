"use client";
import { Typography } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import * as ApiPolls from "../services/BeuniPollsApi";

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
      {polls.length && (
        <Typography variant="h1" component="h1" align="center">
          List of Polls
        </Typography>
      )}
    </>
  );
}
