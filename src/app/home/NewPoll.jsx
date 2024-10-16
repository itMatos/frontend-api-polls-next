import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";

export default function NewPoll() {
  return (
    <>
      <Card m={2} p={2}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Add a new Poll"
          subheader="Create a new poll easily"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Do you need a new poll? Click the button below to create a new poll
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button>Create new poll</Button>
        </CardActions>
      </Card>
    </>
  );
}
