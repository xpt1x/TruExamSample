import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import Api from './Api';
import { navigate } from '@reach/router';
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none"
  }
}));

export default function CreateTask({enqueueSnackbar}) {
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault()
    const name = document.getElementById('task-title').value
    const details = document.getElementById('task-details').value
    const image = document.getElementById('contained-button-file').files[0]

    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('details', details)
    formdata.append('image', image)
    setLoading(true)
    Api.post('tasks/', formdata).then(response => {
      setLoading(false)
      if(!response.ok) {
        enqueueSnackbar(response.problem, {variant: 'error'})
      }
      else {
        enqueueSnackbar('Created task successfully', {variant: 'success'})
          navigate('/')
        }
    })
  }
  const [loading, setLoading] = useState(false)
  return (
  <>
  <Loading open={loading} />
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <Typography component="h1" variant="h5">
      Create New Task
    </Typography>
    <form className={classes.form} >
      <TextField 
        id="task-title" 
        margin="normal"
        color="primary" 
        variant="outlined" 
        label="Task Title" 
        fullWidth
        required 
      />
      <TextField 
      id="task-details" 
      color="primary" 
      variant="outlined" 
      label="Task details"
      margin="normal"
      fullWidth 
      multiline 
      required 
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
            <PhotoCamera />
          Upload
        </Button>
      </label>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Create this task
      </Button>
      
    </form>
  </div>
  </Container>
  </>
  );
}
