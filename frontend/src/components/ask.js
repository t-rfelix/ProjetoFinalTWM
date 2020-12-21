import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button,  CssBaseline, TextField, Grid, Container} from '@material-ui/core';
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

export default function Ask() {
  const classes = useStyles();


//   let { q_id } = useParams();

  const [valueQuestion, setValueQuestion] = useState();
//   const [valuePassword, setValuePassword] = useState();

  const onQuestionChange = (e) => {
      setValueQuestion(e.target.value);
  }

//   const onPasswordChange = (e) => {
//       setValuePassword(e.target.value);
//   }

  const buttonHandler = async () => {
      if(valueQuestion) {          
          const res = await axios.post('http://localhost:5000/questions/ask', { authorization: sessionStorage.getItem('usertoken'), body: valueQuestion}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('usertoken')}`
          }})            
          window.location = '/'    
      }
  }
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // autoComplete="fname"
                // name="firstName"
                variant="outlined"
                // required
                fullWidth
                // id="userName"
                label="Question"
                autoFocus
                onChange={onQuestionChange}
              />
            </Grid>            
            {/* <Grid item xs={12}>
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
            </Grid>             */}
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
            onClick={() => {buttonHandler()}}
          >
            Submit
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>      
    </Container>
  );
}