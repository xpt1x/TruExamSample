import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { navigate } from "@reach/router";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20%",
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function Landing() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Button size="large" variant="outlined" color="primary" onClick={() => navigate('/view')} >
          I'm an Instructor
        </Button>
        <Button size="large" variant="outlined" color="secondary" onClick={() => navigate('/tasks')}>
          I'm a Student
        </Button>
      </div>
    );
  }