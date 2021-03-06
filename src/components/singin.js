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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
    margin: theme.spacing(8, 4),
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
export default function SignIn() {

  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [op, setOp] = React.useState(false);
  const [isError, setisError] = React.useState(false);
  const [Message, setMessage] = React.useState("");
  const [help, setHelp] = React.useState("");
  const [password, setPassword] = React.useState("");

  const datosEmail = (event) => {
    setEmail(event.target.value);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(event.target.value.toLowerCase())) {
      setHelp("Formato de correo incorrecto.")
      setisError(true);
    } else {
      setHelp("");
      setisError(false);
    }
  }
  const datosPw = (event) => {
    setPassword(event.target.value);
  }

  const handleClose = () => {
    setOp(false);
  }


  const enviarDatos = () => {
    if (email.length == 0 || password.length == 0) {
      setMessage("Rellena todos los campos");
      setOp(true);
    } else if (isError) {
      setMessage("Ingresa el correo correctamente.");
      setOp(true);
    } else {
      var obj = {};
      obj.data = {};
      obj.data.email = email;
      obj.data.password = password;
      var js = JSON.stringify(obj);
      var url = 'http://waby.tk/API/usuarios/login';
      sendData(url, js).then((response) => {
        if (response.status == "Error") {
          alert(response.result)
        } else {
          localStorage.setItem('id', response.result);
          window.location.href = 'http://waby.tk/';
        }
      });
    }
  }

  async function sendData(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <Header />
      <Grid container component="main" className={classes.root} alignItems="center" >
        <CssBaseline />
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" >
            <img src={require('../assests/Logo_white.png')} alt='c2' width='70%' height='70%' />
          </Box>
        </Grid>
        <Grid item xs={6} elevation={6} square style={{ padding: 60 }}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={isError}
                helperText={help}
                fullWidth
                id="email"
                label="Email Address"
                onChange={(evt) => datosEmail(evt)}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={(evt) => datosPw(evt)}
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={enviarDatos}
              >
                Sign In
           </Button>
              <Dialog
                open={op}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Advertencia"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {Message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
