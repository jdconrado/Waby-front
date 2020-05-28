import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from './footer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { positions } from '@material-ui/system';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function Profile() {
  const [circle, setCircle] = React.useState(true);
  const [name, setName] = React.useState("");
  const [lName, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [op, setOp] = React.useState(false);
  const [Message, setMessage] = React.useState("");
  const [isError, setisError] = React.useState(false);
  const [help, setHelp] = React.useState("");
  const [is_staff, setIs_Staff] = React.useState(true);

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

  const handleClose = () => {
    setOp(false);
  }

  const enviarDatos = () => {
    if (name.length == 0 || lName.length == 0 || email.length == 0) {
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
      var js = JSON.stringify(obj);
      var url = 'http://waby.tk/API/usuarios/update/' + id;
      updateData(url, js).then((data) => {
        alert(data.result);
      });
    }
  }
  async function updateData(url = '', data = {}) {
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




  const [disable, setDisable] = React.useState(true);
  const handleDisable = () => {
    setDisable(true);
    enviarDatos();
  };
  const handleAble = () => {
    setDisable(false);
  };


  const [id, setId] = React.useState("");
  useEffect(() => {
    let token = localStorage.getItem("id");
    componentDidMount(`http://waby.tk/API/usuarios/getid/${token}`, 'POST').then((res) => {
      setId(res.result); componentDidMount(`http://waby.tk/API/usuarios/getUser/${res.result}`, 'GET').then((res) => {

        setName(res.result.name);
        setLname(res.result.lastname);
        setEmail(res.result.email);
        setIs_Staff(res.result.staff);
        if (res.result.staff == 'True') {
          setIs_Staff(true);
        } else {
          setIs_Staff(false);
        }
        setCircle(false);

      })
    })






  }, [null])

  async function componentDidMount(url = '', type) {
    const response = await fetch(url, {
      method: type, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }).then((res) => {
      return res.json()
    }); return response;
  }


  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <Header />
      <Backdrop className={classes.backdrop} open={circle} style={{ zIndex: 3 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container component="main" className={classes.root} alignItems="center">
        <CssBaseline />
        <Grid item xs={6} z-index='3'>
          <Box display="flex" justifyContent="center" z-index='0'>
            <img src={require('../assests/Logo_white.png')} alt='c2' width='70%' height='70%' z-index='0' />
          </Box>
        </Grid>
        <Grid item xs={6} elevation={6} square style={{ padding: 100 }}>
          <div className={classes.paper}>
            {disable &&
              <form className={classes.form} noValidate>
                <TextField
                  disabled
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={name}
                  //defaultValue={name}
                  id="name"
                  label="Nombre"
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
                  value={lName}
                  // defaultValue={lName}
                  name="lname"
                  autoComplete="Last name"
                  autoFocus
                />

                <TextField
                  //  defaultValue={email}
                  variant="outlined"
                  disabled
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <Grid container component="main" className={classes.root} alignItems="center" >
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleAble}
                    >
                      Modificar información
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {!is_staff &&
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href={`/user/${id}/historial`}
                      >
                        Historial de pedidos
                   </Button>}
                  </Grid>
                  <Grid item xs={4}>

                    {!is_staff &&
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href={`/user/${id}/pedidos`}
                      >
                        Seguimiento de pedidos
                   </Button>
                    }

                  </Grid>
                </Grid>
              </form>
            }
            {!disable &&
              <form className={classes.form} noValidatek>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={(evt) => datosName(evt)}
                  defaultValue={name}
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Apellido"
                  onChange={(evt) => datosLname(evt)}
                  defaultValue={lName}
                  name="lname"
                  autoComplete="Last name"
                  autoFocus
                />

                <TextField
                  defaultValue={email}
                  variant="outlined"
                  margin="normal"
                  required
                  error={isError}
                  helperText={help}
                  fullWidth
                  id="email"
                  onChange={(evt) => datosEmail(evt)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <Grid container component="main" className={classes.root} alignItems="center" >
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleDisable}

                    >
                      Confirmar información
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
                  </Grid>
                  <Grid item xs={4}>
                    {!is_staff &&
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href={`/user/${id}/historial`}
                      >
                        Historial de pedidos
                   </Button>}
                  </Grid>
                  <Grid item xs={4}>
                    {!is_staff
                      &&
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href={`/user/${id}/pedidos`}
                      >
                        Seguimiento de pedidos
                      </Button>
                    }
                  </Grid>
                </Grid>
              </form>
            }
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div >
  );
}
