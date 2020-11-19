import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FetchTasks from './FetchTasks';
import { CardActionArea, Container } from '@material-ui/core';
import Loading from './Loading';
import { navigate } from '@reach/router';
import RateReviewIcon from '@material-ui/icons/RateReview';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  root: {
    width: '100%'
  },
  title: {
    fontSize: 16
  },
  task: {
    fontSize: 14
  },
  cover: {
    float: "right",
    marginTop: -45,
  }
}));

export default function Tasks({tasks, setTasks, enqueueSnackbar, setSelection}) {
  const classes = useStyles();

  useEffect(() => {
    FetchTasks({ setTasks, enqueueSnackbar });
  }, [enqueueSnackbar, setTasks]);

  const cardClickHandler = (task) => {
    setSelection(task)
    return navigate(`/submit/${task.id}`)
  }

  return (
    <Container style={{width: '100%', marginTop: 48}}>
      {tasks === undefined ? <Loading open={true} /> :
      tasks.length > 0 ?
      tasks.map((task) => (
        <Container key={task.name} style={{marginTop: 48}}>
        <CardActionArea>
        <Card className={classes.root} onClick={() => cardClickHandler(task)}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {task.name}
            </Typography>
            {/* <Typography
              className={classes.task}
              color="textSecondary"
              gutterBottom
            >
              {task.details}
            </Typography> */}
            <RateReviewIcon />
            <div className={classes.cover}>
            <img src={task.imageurl} alt={task.name} width={100} height={100}></img>
            </div>
          </CardContent>
        </Card>
        </CardActionArea>
        </Container>
      )) :
      <Typography variant="h4" align="center"> 
          No new tasks found!
      </Typography>
      }
    </Container>
  );
}
