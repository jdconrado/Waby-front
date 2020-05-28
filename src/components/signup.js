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

export default function SignUn() {

  const classes = useStyles();


  const [name, setName] = React.useState("");
  const [lName, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [admin, setAdmin] = React.useState(false);
  const [help, setHelp] = React.useState("");
  const [op, setOp] = React.useState(false);
  const [isError, setisError] = React.useState(false);
  const [Message, setMessage] = React.useState("");

  const datosName = (event) => {
    setName(event.target.value);
  }
  const datosLname = (event) => {
    setLname(event.target.value);
  }
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
  const datosAdmin = (event) => {
    setAdmin(event.target.value);
  }
  const handleClose = () =>{
    setOp(false);
  }

  const verificarTipo = () => {

    if (admin) {
      if (pwAdmin == "Waby2020") {
        enviarDatos();
      } else {
        alert("Error, contraseña de administrador incorrecta");
      }
    } else {
      enviarDatos();
    }

  }


  const enviarDatos = () => {
    if (name.length == 0 || lName.length == 0 || email.length == 0 || password.length == 0) {
      setMessage("Rellena todos los campos");
      setOp(true);
    } else if (isError) {
      setMessage("Ingresa el correo correctamente.");
      setOp(true);
    } else {
      var obj = {};
      obj.data = {};
      obj.data.name = name;
      obj.data.lastname = lName;
      obj.data.email = email;
      obj.data.password = password;
      obj.data.tipo = admin;
      var js = JSON.stringify(obj);
      var url = 'http://waby.tk/API/usuarios/crear';
      postData(url, js).then((response) => {
        if (response.status == "Error") {
          if (response.details.includes("already exists")) {
            alert("Ya esta en uso el correo electronico.")
          } else {
            alert(response.result);
          }
        } else {
          localStorage.setItem('id', response.result);
          window.location.href = "http://waby.tk"
        }
      });
    }
  }
  async function postData(url = '', data = {}) {
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

  const [pwAdmin, setPwAdmin] = React.useState("");
  const habilitarPw = (evt) => {
    if (evt.target.checked) {
      setAdmin(true);
    } else {
      setAdmin(false)
    }
  }

  const datosPwAdmin = (evt) => {
    setPwAdmin(evt.target.value);
  }

  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <Header />
      <Grid container component="main" className={classes.root} alignItems="center">
        <CssBaseline />
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <img src={require('../assests/Logo_white.png')} alt='c2' width='70%' height='70%' />
          </Box>
        </Grid>
        <Grid item xs={6} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(evt) => datosName(evt)}
                id="fname"
                label="Nombre"
                name="fname"
                autoComplete="fname"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lname"
                onChange={(evt) => datosLname(evt)}
                label="Apellido"
                name="lname"
                autoComplete="lname"

              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={isError}
                helperText={help}
                fullWidth
                id="email"
                onChange={(evt) => datosEmail(evt)}
                label="Correo electrónico"
                name="email"
                autoComplete="email"

              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                onChange={(evt) => datosPw(evt)}
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {admin &&
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Contraseña de autorización"
                  onChange={(evt) => datosPwAdmin(evt)}
                  type="password"
                  id="password2"
                />

              }

              <FormControlLabel
                value="top"
                control={<Checkbox color="primary" />}
                label="Registro como administrador"
                labelPlacement="end"
                onChange={(evt) => habilitarPw(evt)}
              />

              <Button

                fullWidth
                variant="contained"
                color="primary"

                onClick={verificarTipo}

              >
                Sign Up
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
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
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
