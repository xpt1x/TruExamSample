import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "@reach/router";
import { CardActionArea, Container, Tooltip } from "@material-ui/core";
import FetchSubmissions from "./FetchSubmissions";
import Loading from "./Loading";
import RateReviewIcon from '@material-ui/icons/RateReview';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  title: {
    fontSize: 16
  },
  sub: {
    fontSize: 14
  },
  cover: {
    float: "right",
    marginTop: -45,
  }
}));

export default function Review({ enqueueSnackbar, setSubs, setSelection, subs }) {
  const classes = useStyles();
  useEffect(() => {
    FetchSubmissions({ setSubs, enqueueSnackbar });
  }, [enqueueSnackbar, setSubs]);

  const cardClickHandler = (sub) => {
    setSelection(sub)
    return navigate(`/review/${sub.id}`)
  }

  return (
    <Container style={{width: '100%', marginTop: 48}}>
      {subs === undefined ? <Loading open={true} /> : 
      subs.length > 0 ? subs.map((sub) => (
        <Container key={sub.name} style={{marginTop: 48}}>
        <CardActionArea>
        <Card className={classes.root} onClick={() => cardClickHandler(sub)}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {sub.name}
            </Typography>
            {/* <Typography
              className={classes.sub}
              color="textSecondary"
              gutterBottom
            >
              {sub.details}
            </Typography> */}
            <RateReviewIcon />
            <div className={classes.cover}>
            <img src={sub.imageurl} alt={sub.name} width={100} height={100}></img>
            </div>
          </CardContent>
        </Card>
        </CardActionArea>
        </Container>
      )) : 
      <Typography variant="h4" align="center"> 
          No new submissions found!
      </Typography>}
      <Tooltip
        title="Create task"
      > 
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={() => navigate("/create")}
      >
        <AddIcon />
      </Fab>
      </Tooltip>  
    </Container>
  );
}
