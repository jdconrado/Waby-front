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

export default function SignIn() {

  const classes = useStyles();
  const Information = data;
  const [price, setPrice] = React.useState(0)
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setPrice(price + value.price);
    } else {
      setPrice(price - checked[currentIndex].price);
      newChecked.splice(currentIndex, 1);
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
          <Grid className={classes.border} item xs={3}>
            <List component="nav" aria-label="main mailbox folders" subheader={<ListSubheader>Tus ingredientes<Divider /></ListSubheader>}>{checked.map(function (info, i) {
              return <div key={i}>
                <ListItem >{info.name}</ListItem>
              </div>
            })}</List>
          </Grid>
          <Grid className={classes.border} item xs={3} >
            <List component="nav" aria-label="main mailbox folders" subheader={<ListSubheader>Ingredientes<Divider /></ListSubheader>} >{Information.map(function (info, i) {
              return <div key={i}>
                <ListItem >
                  <ListItemText
                    primary={info.name}
                    secondary={"Precio: $" + info.price} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(info)}
                      checked={checked.indexOf(info) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            })}</List>
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="¿Cómo lo quieres?"
                multiline
                rows={10}
                variant="outlined"
              />
            </div>
            <Grid container justify="flex-end">
              <Grid item xs={3}>
                <div>Total: ${price}</div>
              </Grid>
              <Button variant="outlined" color="primary" size="medium">
                Pedir
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
