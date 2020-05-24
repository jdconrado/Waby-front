import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default class Profile extends React.Component {

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        height: '90vh',
      },
      image: {
        backgroundImage: '../assests/Waby_screenpurple.png',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
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
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    let userId = this.props.match.params.id;
    const name = "Moise", lname = "Juan", email = "Brayan@hotmail.com";
    console.log(userId)

    return (
      <div style={{ backgroundColor: '#AF67E6' }}>
        <Header />
        <Grid container component="main" className={classes.root} alignItems="center" >
          <CssBaseline />
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center" >
              <img src={require('../assests/Logo_white.png')} alt='c2' width='50%' height='50%' />
            </Box>
          </Grid>
          <Grid item xs={6} component={Paper} elevation={6} square style={{ padding: 100 }}>
            <div className={classes.paper}>
              <form className={classes.form} noValidatek>
                <TextField
                  disabled
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  defaultValue={name}
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />

                <TextField
                  disabled
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Apellido"
                  defaultValue={lname}
                  name="lname"
                  autoComplete="Last name"
                  autoFocus
                />

                <TextField
                  defaultValue={email}
                  variant="outlined"
                  disabled
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  defaultValue={userId}
                  variant="outlined"
                  disabled
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="id"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container component="main" className={classes.root} alignItems="center" >
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Actualizar datos
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Actualizar datos
                   </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </div >
    );
  }
}