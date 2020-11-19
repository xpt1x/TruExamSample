import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Api from './Api';
import { navigate } from '@reach/router';
import Loading from './Loading';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none"
  }
}));

export default function SubmitTask({enqueueSnackbar, selection}) {
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault()
    const image = document.getElementById('contained-button-file').files[0]

    const formdata = new FormData()
    formdata.append('tid', selection.id)
    formdata.append('docimage', image)
    setLoading(true)
    Api.post('/submit', formdata).then(response => {
      setLoading(false)
      if(!response.ok) {
        enqueueSnackbar(response.problem, {variant: 'error'})
      }
      else {
        if(response.data.success) {
        enqueueSnackbar('Work turned in successfully', {variant: 'success'})
          navigate('/')
        }
        else {
          enqueueSnackbar(response.data.err, {variant: 'error'})
        }
      }
    })
  }
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  return (
  <>
  <Loading  open={loading}/>
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <img src={selection.imageurl} alt={selection.name} width={400} height={400} />

    <form className={classes.form} >
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Grid container justify="center">
        <Button variant="contained" color="primary" component="span">
            <PhotoCamera />
          Upload
        </Button>
        <Button style={{marginLeft: 10}} variant="outlined" color="primary" onClick={() => setOpen(true)}>
          View Editorial
        </Button>
        </Grid>
      </label>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={handleSubmit}
        endIcon={<SendIcon />}
      >
        Turn your work in
      </Button>
      
    </form>
  </div>
  </Container>
  <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
            Editorial for this task
        </DialogTitle>
        <DialogContent dividers>
        {selection.details}
        </DialogContent>
  </Dialog> 
  </>
  );
}
