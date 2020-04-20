import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './footer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import data from '../Information.json'; //Until a good json is received
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Header from './header'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  border: {
    border: '1px solid #000000',
  },
  image: {
    backgroundImage: '../assests/Waby_screenpurple.png',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  input: {
    width: 42,
  },
  paper: {
    margin: theme.spacing(5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

export default function Orders() {

  const classes = useStyles();
  //const url = 'http//localhost:8000'
  const Information = data;
  const [price, setPrice] = React.useState(0)
  const [checked, setChecked] = React.useState([]);
  const [Info3, setInfo] = React.useState(Information);
  const [tot, setTotal] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);
  const [descripcion, setDesc] = React.useState("");

  const handleDesc = (event) => {
    setDesc(event.target.value);
  }

  const handleInputChange = (event, i) => {
    const total = [...tot];
    const num = parseInt(Number(event.target.value));
    var subs;
    if (price < 0) {
      setPrice(0);
    }
    if (num <= 10) {
      if (num > total[checked[i].id]) {
        if (total[checked[i].id].length == 0) {
          subs = price + parseFloat(parseFloat(Information[checked[i].id].price * num).toFixed(2));
          setPrice(subs);
        } else {
          if (total[checked[i].id] == num - 1) {
            subs = price + parseFloat(parseFloat(Information[checked[i].id].price).toFixed(2));
            setPrice(subs);
          } else {
            subs = price - parseFloat(parseFloat(Information[checked[i].id].price * total[checked[i].id]).toFixed(2)) + parseFloat(parseFloat(Information[checked[i].id].price * num).toFixed(2));
            setPrice(subs)
          }
        }

      } else if (num < total[checked[i].id] && price > 0) {
        if (event.target.length == undefined) {
          subs = price - parseFloat(parseFloat(Information[checked[i].id].price * total[checked[i].id]).toFixed(2));
          if ((subs != 0 && total[checked[i].id] == 0) || price < 0) {
            setPrice(0);
          } else {
            if (subs < 0) {
              subs = 0;
            } else {
              subs = price - parseFloat(parseFloat(Information[checked[i].id].price).toFixed(2));
            }
            if (total[checked[i].id] == 10 && num == 1) {
              subs = price - parseFloat(parseFloat(Information[checked[i].id].price * 9).toFixed(2))
              setPrice(subs)
            } else {
              setPrice(subs);
            }
          }
        } else {
          subs = price - parseFloat(parseFloat(Information[checked[i].id].price).toFixed(2));
          if (subs != 0 && total[checked[i].id] == 0) {
            setPrice(0);
          } else {
            setPrice(subs);
          }
        }
      }


      total[checked[i].id] = event.target.value;
      setTotal(total);
    }
  };

  function str(string) {
    return string.substring(1).replace(/[0-9]/g, '');
  };

  const handleRemove = (type, number, currentIndex) => {
    var numb = type.match(/\d/g);
    numb = numb.join("");
    var fuckyou = parseFloat(parseFloat(price - parseFloat(parseFloat(Information[currentIndex].price * number / numb).toFixed(2))).toFixed(2));
    setPrice(fuckyou);
  };

  const handleClick = () => {
    if (price == 0) {
      setOp(true);
    } else {
      setOpen(true);
    }

  }

  const handleClose = () => {
    if (op) {
      setOp(false);
    } else {
      setOpen(false);
    }
  }

  const handleAccept = () => {
    var obj = {}
    obj.data = {}
    obj.data.especificaciones = descripcion;
    obj.data.receta = [];
    var i = 0;
    checked.forEach(element => {
      var ingId = element.id;
      var cantidad = tot[element.id];
      obj.data.receta.push({
        'ingId': ingId,
        'cantidad': cantidad
      });
      i = i + 1;
    });
    obj.data.precioTotal = price;
    obj.data.estado = 'Creado';
    console.log(obj);
    var js = JSON.stringify(obj);
    setOpen(false);
    postData('http//localhost:8000/pedidos/crear', js);
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

  const handleChange = (evt, type, i) => {
    const total = [...tot];
    var ev = evt.target.value;
    var FUCKYOU;
    var numb = type.match(/\d/g);
    if (ev.length == 0) {
      ev = 0;
    }
    if (numb == null) {
      FUCKYOU = price + parseFloat(parseFloat(Information[checked[i].id].price).toFixed(2));
      setPrice(FUCKYOU);
    } else {
      numb = numb.join("");
      if (ev == 0 && total[checked[i].id] != 0) {
        FUCKYOU = price - parseFloat(parseFloat(Information[checked[i].id].price * total[checked[i].id] / numb).toFixed(2));
        setPrice(FUCKYOU);
      } else if (ev != total[checked[i].id] && total[checked[i]] == 0 && ev != 0) {
        FUCKYOU = price + parseFloat(parseFloat(Information[checked[i].id].price * ev / numb).toFixed(2));
        setPrice(FUCKYOU);
      } else if (ev != total[checked[i].id] && ev != 0) {
        FUCKYOU = price - parseFloat(parseFloat(Information[checked[i].id].price * total[checked[i].id] / numb).toFixed(2)) + parseFloat(parseFloat(Information[checked[i].id].price * ev / numb).toFixed(2));
        setPrice(FUCKYOU);
      }
    }
    total[checked[i].id] = ev;
    setTotal(total);
  };

  const handleBlur = (i) => {
    const total = [...tot];
    if (total[checked[i].id] < 0) {
      total[checked[i].id] = 0;
      setTotal(total);
    } else if (total[checked[i].id] > 10) {
      total[checked[i].id] = 10;
      setTotal(total);
    }
  };

  const search = (event) => {
    if (!event.target.value == '') {
      var newInfo = [];
      Information.forEach(element => {
        if (element.name.toLowerCase().includes(event.target.value.toLowerCase())) {
          newInfo.push(element);
        }
      });
      setInfo(newInfo);
    } else {
      setInfo(Information);
    }
  };


  const handleToggle = (value, i) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const realInd = Information.indexOf(value);
    var total = [...tot]
    if (total.length == 0) {
      var t;
      (t = []).length = Information.length;
      t.fill(0);
      total = [...t];
    }
    if (currentIndex == -1) {
      newChecked.push(value);
      setTotal(total)
    } else {
      newChecked.splice(currentIndex, 1);
      if (checked[currentIndex].type.length != 0) {
        handleRemove(checked[currentIndex].type, total[realInd], realInd);
      } else {
        setPrice(price - checked[currentIndex].price * total[realInd]);
      }
      total[realInd] = 0;
      setTotal(total);
    }
    setChecked(newChecked);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Header />
      <Grid container item xs={12}>
        <CssBaseline />
        <Grid item xs={12}>
          <Container className={classes.paper}>
            <Typography variant='body1'>
              Escoge los ingredientes para tu comida y dinos como quieres que se cocine!
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Grid>
        <CssBaseline />
        <Grid container item xs={12} spacing={0} >
          <Grid className={classes.border} item xs={3} >
            <List component="nav" aria-label="main mailbox folders" subheader={<ListSubheader>Ingredientes <br /> <Input id="standard-basic" placeholder="Buscar" onChange={search} /> <Divider /> </ListSubheader>} >{Info3.map(function (info, i) {
              return <div key={i}>
                <ListItem >
                  <ListItemText
                    primary={info.name}
                    secondary={"Precio: $" + info.price + info.type} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(info, i)}
                      checked={checked.indexOf(info) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            })}</List>
          </Grid>
          <Grid className={classes.border} item xs={3}>
            <List component="nav" aria-label="main mailbox folders" subheader={<ListSubheader>Tus ingredientes<Divider /></ListSubheader>}>{checked.map(function (info, i) {
              return <div key={i}>
                <ListItem >{info.name}
                  <ListItemSecondaryAction>
                    {info.type.length == 0 && <Input
                      className={classes.input}
                      value={tot[info.id]}
                      margin="dense"
                      onChange={(evt) => handleInputChange(evt, i)}
                      onBlur={handleBlur(i)}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />}
                    {info.type.length > 0 && <Input
                      id="standard-adornment-weight"
                      value={tot[checked[i].id]}
                      className={classes.input}
                      onChange={(evt) => handleChange(evt, info.type, i)}
                      endAdornment={<InputAdornment position="end">{str(info.type)}</InputAdornment>}
                    />}
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            })}</List>
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField
                fullWidth
                label="¿Cómo lo quieres?"
                onChange={(evt) => handleDesc(evt)}
                multiline
                rows={10}
                variant="outlined"
              />
            </div>
            <Grid container justify="flex-end">
              <Grid item xs={3}>
                <div>Total: ${price}</div>
              </Grid>
              <Button onClick={handleClick} variant="outlined" color="primary" size="medium">
                Pedir
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"¿Quieres mandar la orden?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Si estas seguro que la orden esta completa, dale en aceptar!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                 </Button>
                  <Button onClick={handleAccept} href="/" color="primary" autoFocus>
                    Aceptar
                 </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={op}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"No has ordenado!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Primero tienes que ordenar para poder pedir!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
