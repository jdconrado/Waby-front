import React, { useEffect } from 'react';
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
    width: 90,
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

async function getInfo(type, uurl = '') {
  const url = 'http://127.0.0.1:8000/' + uurl
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
  }).then((dat) => { return dat.result });
  return response;
}

export default function Orders() {
  const [id, setId] = React.useState();
  const classes = useStyles();
  const [Information, setInformation] = React.useState([]);
  const [Info3, setInfo] = React.useState([Information]);
  useEffect(() => {
    let token = localStorage.getItem("id");
    let ingr = []
    getInfo('POST', 'usuarios/getid/' + token).then((data) => {
      setId(data);
    })
    getInfo('GET', 'ingredientes/getall').then((data) => {
      data.forEach(element => {
        if (element.stock > 0) {
          ingr.push(element);
        }
      })
      setInformation(ingr);
      setInfo(ingr);
    })
  }, [null])
  const [price, setPrice] = React.useState(0)
  const [checked, setChecked] = React.useState([]);
  const [tot, setTotal] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);
  const [descripcion, setDesc] = React.useState("");
  const [Exceeded, setString] = React.useState("")
  const [Alert, setAlert] = React.useState(false);

  const handleDesc = (event) => {
    setDesc(event.target.value);
  }

  const handleInputChange = (event, id) => {
    const total = [...tot];
    const i = Information.indexOf(id);
    const ind = checked.indexOf(id);
    const num = parseInt(Number(event.target.value));
    var subs;
    if (price < 0) {
      setPrice(0);
    }
    if (num <= 10) {
      if (num > total[i]) {
        if (total[i].length == 0) {
          subs = price + parseFloat(parseFloat(checked[ind].precio * num).toFixed(2));
          setPrice(subs);
        } else {
          if (total[i] == num - 1) {
            subs = price + parseFloat(parseFloat(checked[ind].precio).toFixed(2));
            setPrice(subs);
          } else {
            subs = price - parseFloat(parseFloat(checked[ind].precio * total[i]).toFixed(2)) + parseFloat(parseFloat(checked[ind].precio * num).toFixed(2));
            setPrice(subs)
          }
        }

      } else if (num < total[i] && price > 0) {
        if (event.target.length == undefined) {
          subs = price - parseFloat(parseFloat(checked[ind].precio * total[i]).toFixed(2));
          if ((subs != 0 && total[i] == 0) || price < 0) {
            setPrice(0);
          } else {
            if (subs < 0) {
              subs = 0;
            } else {
              subs = price - parseFloat(parseFloat(checked[ind].precio).toFixed(2));
            }
            if (total[i] == 10 && num == 1) {
              subs = price - parseFloat(parseFloat(checked[ind].precio * 9).toFixed(2))
              setPrice(subs)
            } else {
              setPrice(subs);
            }
          }
        } else {
          subs = price - parseFloat(parseFloat(checked[ind].precio).toFixed(2));
          if (subs != 0 && total[i] == 0) {
            setPrice(0);
          } else {
            setPrice(subs);
          }
        }
      }


      total[i] = event.target.value;
      setTotal(total);
    }
  };

  function str(string) {
    return string.substring(1).replace(/[0-9]/g, '');
  };

  const handleRemove = (type, number, currentIndex) => {
    var numb = type.match(/\d/g);
    numb = numb.join("");
    var Valor = parseFloat(parseFloat(price - parseFloat(parseFloat(Information[currentIndex].precio * number / numb).toFixed(2))).toFixed(2));
    setPrice(Valor);
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
    obj.data.userId = id;
    obj.data.especificaciones = descripcion;
    obj.data.receta = [];
    var i = 0;
    var exceed = false;
    checked.forEach(element => {
      var ingId = element.id;
      var index = Information.indexOf(element);
      var cantidad = tot[index];
      if (cantidad > Information[index].stock) {
        exceed = true;
        setString("Del item " + Information[index].nombre_ing + " solo puedes pedir un máximo de " + Information[index].stock + " unidades!");
      }
      obj.data.receta.push({
        'ingId': ingId,
        'cantidad': cantidad
      });
      i = i + 1;
    });
    obj.data.precioTotal = price;
    obj.data.estado = 'Creado';
    var js = JSON.stringify(obj);
    setOpen(false);
    if (exceed == false) {
      if (descripcion.length == 0) {
        setOp(true);
      } else {
        redirData('http://127.0.0.1:8000/pedidos/crear', js, 'POST').then((data) => {
          obj.data.receta.forEach(element => {
            redirData('http://127.0.0.1:8000/ingredientes/actualizar/' + element.ingId, getIng(element.ingId, element.cantidad), 'PUT').then((data) => { });
          })
        }).then((data)=>{
          window.location.href = 'http://127.0.0.1:3000/';
        });
      }
    } else {
      setAlert(true)
    }
  }
  const getIng = (id, stock) => {
    var obj = {}
    obj.data = {};
    var js;
    Information.forEach(elemento => {
      if (elemento.id == id) {
        obj.data = elemento;
        obj.data.stock = obj.data.stock - stock;

      }
    })
    js = JSON.stringify(obj)
    return js;
  }
  const handleAlert = () => {
    setAlert(false);
  }
  async function redirData(url = '', data = {}, type) {
    const response = await fetch(url, {
      method: type, // *GET, POST, PUT, DELETE, etc.
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

  const handleChange = (evt, type, id) => {
    const ind = Information.indexOf(id);
    const i = checked.indexOf(id);
    const total = [...tot];
    var ev = evt.target.value;
    var Valor;
    var numb = type.match(/\d/g);
    if (ev.length == 0) {
      ev = 0;
    }
    if (numb == null) {
      Valor = price + parseFloat(parseFloat(checked[i].precio).toFixed(2));
      setPrice(Valor);
    } else {
      numb = numb.join("");
      if (ev == 0 && total[ind] != 0) {
        Valor = price - parseFloat(parseFloat(checked[i].precio * total[ind] / numb).toFixed(2));
        setPrice(Valor);
      } else if (ev != total[ind] && total[ind] == 0 && ev != 0) {
        Valor = price + parseFloat(parseFloat(checked[i].precio * ev / numb).toFixed(2));
        setPrice(Valor);
      } else if (ev != total[ind] && ev != 0) {
        Valor = price - parseFloat(parseFloat(checked[i].precio * total[ind] / numb).toFixed(2)) + parseFloat(parseFloat(checked[i].precio * ev / numb).toFixed(2));
        setPrice(Valor);
      }
    }
    total[ind] = ev;
    setTotal(total);
  };

  const handleBlur = (ind) => {
    const i = Information.indexOf(ind);
    const total = [...tot];
    if (total[i] < 0) {
      total[i] = 0;
      setTotal(total);
    } else if (total[i] > 10) {
      total[i] = 10;
      setTotal(total);
    }
  };

  const search = (event) => {
    if (!event.target.value == '') {
      var newInfo = [];
      Information.forEach(element => {
        if (element.nombre_ing.toLowerCase().includes(event.target.value.toLowerCase())) {
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
      if (checked[currentIndex].tipo.length > 3) {//Add null
        handleRemove(checked[currentIndex].tipo, total[realInd], realInd);
      } else {
        setPrice(price - checked[currentIndex].precio * total[realInd]);
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
                    primary={info.nombre_ing}
                    secondary={"precio: $" + info.precio + info.tipo + "\n Cantidad: " + info.stock} />
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
                <ListItem >{info.nombre_ing}
                  <ListItemSecondaryAction>
                    {info.tipo.length == 3 && <Input //null
                      className={classes.input}
                      value={tot[Information.indexOf(info)]}
                      margin="dense"
                      onChange={(evt) => handleInputChange(evt, info)}
                      onBlur={handleBlur(info)}
                      endAdornment={<InputAdornment position="end">{str(info.tipo)}</InputAdornment>}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />}
                    {info.tipo.length > 3 && <Input //null
                      id="standard-adornment-weight"
                      value={tot[Information.indexOf(info)]}
                      className={classes.input}
                      onChange={(evt) => handleChange(evt, info.tipo, info)}
                      endAdornment={<InputAdornment position="end">{str(info.tipo)}</InputAdornment>}
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
                  <Button onClick={handleAccept} color="primary" autoFocus>
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
                <DialogTitle id="alert-dialog-slide-title">{"No has terminado!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Primero tienes que elegir los ingredientes y llenar todos los campos para poder pedir!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={Alert}
                onClose={handleAlert}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Te has excedido!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {Exceeded}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAlert} color="primary">
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
