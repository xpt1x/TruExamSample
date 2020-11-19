import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Container, CssBaseline, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Api from './Api';
import { navigate } from '@reach/router';
import Loading from './Loading';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *' : {
        margin: theme.spacing(1)
    }
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
  },
  formcontrol: {
      marginTop: theme.spacing(3),
      minWidth: 150
  },
  card: {
    marginTop: theme.spacing(3)
  }
}));

export default function ReviewTask({enqueueSnackbar, selection}) {
  const classes = useStyles();
  const [ori_open, setOriOpen] = useState(false)
  const [sub_open, setSubOpen] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const formdata = new FormData()
    formdata.append('sid', selection.id)
    formdata.append('score', rating)
    Api.post('/submitscore', formdata).then(response => {
      setLoading(false)
      if(!response.ok) {
        enqueueSnackbar(response.problem, {variant: 'error'})
      }
      else {
        if(response.data.success) {
        enqueueSnackbar('Submitted Score successfully', {variant: 'success'})
          navigate('/')
        }
        else {
          enqueueSnackbar(response.data.err, {variant: 'error'})
        }
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
    <Button variant="outlined" color="primary" onClick={() => setOriOpen(true)}>
        Original Task Image
    </Button>
    <Button variant="outlined" color="secondary" onClick={() => setSubOpen(true)}>
        Submitted Task Image
    </Button>
    <Card className={classes.card}>
      <CardHeader title={selection.name} />
      <CardContent>
        <Typography>
          {selection.details}
        </Typography>
    <FormControl className={classes.formcontrol}>
    <InputLabel id="select-rating">Provide Rating</InputLabel>

    <Select
        labelId="select-rating"
        id="select-rating"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
    >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>

        </Select>
    </FormControl>
    <Grid container justify="center">
      <Button style={{marginTop: 50}} size="large" variant="outlined" color="secondary" onClick={handleSubmit}>
          Submit Rating
      </Button>
    </Grid>
      </CardContent>
    </Card>
  </div>
  
  </Container>
  <Dialog open={ori_open} onClose={() => setOriOpen(false)}>
    <DialogTitle>
        Original Task Image
    </DialogTitle>
    <DialogContent dividers>
    <img src={selection.original_image_url} alt={"original"} width={250} height={250} />
    </DialogContent>
  </Dialog>

  <Dialog open={sub_open} onClose={() => setSubOpen(false)}>
    <DialogTitle>
        Submitted Task Image
    </DialogTitle>
    <DialogContent dividers>
    <img src={selection.imageurl} alt={"submitted"} width={250} height={250} />
    </DialogContent>
  </Dialog>
  </>
  );
}
