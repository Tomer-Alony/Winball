import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  a : {
    color: "inherit",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    backgroundColor: theme.palette.primary.main
  },
  loginButton: {
    alignSelf: "right",
  },
}));

const Header = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <Button color="inherit" className={classes.loginButton}>
            <a href='/auth/google' className={classes.a}>Login With Google</a>
          </Button>
        );
      default:
        return [
          <Button color="inherit" className={classes.loginButton} key={1}>
            <Link to={'/Groups'} className={classes.a}>Groups</Link>
          </Button>,
          <Button color="inherit" className={classes.loginButton} key={2}>
            <Link to={'/Games'} className={classes.a}>Games</Link>
          </Button>,
          <Button color="inherit" className={classes.loginButton} key={2}>
            <Link to={'/Scores'} className={classes.a}>Scores</Link>
          </Button>,
          <Button color="inherit" className={classes.loginButton} key={3}>
            <a href='/api/logout' className={classes.a}>Logout</a>
          </Button>
        ];
    }
  };

  return (
    <nav>
      <AppBar position="static" color="primary">
        
        <div className={classes.toolbar}>
          <Toolbar>
            
          <Link to={'/'} className={classes.a}>
            <Typography variant="h4">
              Winball
            </Typography>
          </Link>
          
          {renderContent()}
          </Toolbar>
        </div>
      </AppBar>
    </nav>
  );
};

export default Header;