import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../actions";
import Typography from "@material-ui/core/Typography";
import {Card, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    fontFamily: theme.typography.fontFamily,
  },
  container: {
    maxHeight: '100%',
  },
}));

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);

  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  if (user) {
    return (
      <Redirect to='/scores' />
    );
  } else {
    return (
        <Card style={{ textAlign: 'center' }} className={classes.root}>
            <Typography variant="h2">
              Welcome to Winball, please log in
          </Typography>
        </Card>
    );
  }
};

export default Landing;