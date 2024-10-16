import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import NewPoll from "./NewPoll";

export default function HomePage() {
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
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beuni Polls HomePage
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <NewPoll />
    </>
  );
}
