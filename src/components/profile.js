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
import Modal from '@material-ui/core/Modal';
import useEffect from 'react';

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
}));






export default function Profile() {



  const [name, setName] = React.useState("Moise");
  const [lName, setLname] = React.useState("Brayan");
  const [email, setEmail] = React.useState("Juancho@hotmail.com");

  const datosName = (event) => {
    setName(event.target.value);
  }
  const datosLname = (event) => {
    setLname(event.target.value);
  }
  const datosEmail = (event) => {
    setEmail(event.target.value);
  }

  const enviarDatos = () => {

    var obj = {};
    obj.data = {};
    obj.data.name = name;
    obj.data.lastname = lName;
    obj.data.email = email;
    console.log(obj);
    var js = JSON.stringify(obj);
    var url = 'http://localhost:8000/usuarios/crear';
    //  updateData(url, js);
  }
  /* async function updateData(url = '', data = {}) {
     const response = await fetch(url, {
       method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
   }*/




  const [disable, setDisable] = React.useState(true);
  const handleDisable = () => {
    setDisable(true);
  };
  const handleAble = () => {
    setDisable(false);
  };


  useEffect(() => {
    let token = localStorage.getItem["id"];
    componentDidMount(`http://127.0.0.1:8000/usuarios/getid/${token}`,'POST')

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
            {disable &&
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
                  defaultValue={lName}
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
                  defaultValue="..."
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
                      onClick={handleAble}
                    >
                      Modificar información
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      href={`/userr//historial`}
                    >
                      Historial de pedidos
                   </Button>
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
                  fullWidth
                  id="email"
                  onChange={(evt) => datosEmail(evt)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  defaultValue="..."
                  variant="outlined"
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
                      onClick={handleDisable}
                    >
                      Confirmar información
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      href={`/userr//historial`}
                    >
                      Historial de pedidos
                   </Button>
                  </Grid>
                </Grid>
              </form>
            }
          </div>
        </Grid>
      </Grid>
    </div >
  );
}
