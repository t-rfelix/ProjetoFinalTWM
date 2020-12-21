import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button,  CssBaseline, TextField, Grid, Typography, Container} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();


  const [valueUsername, setValueUsername] = useState();
  const [valuePassword, setValuePassword] = useState();

  const onUsernameChange = (e) => {
      setValueUsername(e.target.value);
  }

  const onPasswordChange = (e) => {
      setValuePassword(e.target.value);
  }

  const buttonHandler = async () => {
      if(valueUsername && valuePassword) {
          const res = await axios.post('http://localhost:5000/users/login', { username: valueUsername, password: valuePassword });
          console.log(res);          
          props.setUsertoken(res.data.token);          
          window.location = '/';
      }
  }
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                onChange={onUsernameChange}
              />
            </Grid>            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onPasswordChange}
                // autoComplete="current-password"
              />
            </Grid>            
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
            onClick={() => {buttonHandler()}}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Doesn't have an account yet? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>      
    </Container>
  );
}