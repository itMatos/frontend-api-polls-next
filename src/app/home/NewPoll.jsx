import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import Link from "next/link";

export default function NewPoll() {
  return (
    <>
      <Card sx={{ margin: 2, padding: 1 }}>
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
          <Link href="/polls">Create New Poll</Link>
        </CardActions>
      </Card>
    </>
  );
}
