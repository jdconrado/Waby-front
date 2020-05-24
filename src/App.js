import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { Grid, Box, Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '2rem',
    paddingBottom: '2rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
  },
}));
function App() {

  const images = [
    {image: require('./assests/Waby_page1.png'), alt:'Image1'},
    {image: require('./assests/Waby_page2.png'), alt:'Image2'},
    {image: require('./assests/Waby_page3.png'), alt:'Image3'},
  ];

  const classes = useStyles();
  
  return (
    
    <div style={{backgroundColor:'#F2F2F2'}}>
      <Header/> 
      <Carousel autoPlay={true} interval={5000}>
        {
          images.map(imag=>{
            return <img href = "/" src={imag.image} alt={imag.alt} width='100%' height='100%'/ >
          })
        }
      </Carousel>

      <div className={classes.root} style= {{padding: 40}}>
        <Grid container direction='row' justify='center' alignItems='center' spacing={10}>
          <Grid item xs={3}>
            <Paper className={classes.paper} direction='column'>
              <Box>
                <img src={require('./assests/Waby_column1.png')} alt='c1' width='40%' height= '40%'/>
              </Box>
              <Box flexGrow={1}>
                <Typography align='center' variant='h6'>
                  Construye tu plato
                </Typography>
                <Typography align='center' variant='body1'>
                Tu eres quien define lo que obtienes en tu plato, con Waby&copy; tu construyes tu plato, paso a paso, eliges los ingredientes, modo de preparación y demás detalles que quieras incluir en la consecución del plato.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
          <Paper className={classes.paper} direction='column'>
              <Box>
                <img src={require('./assests/Waby_column2.png')} alt='c2' width='40%' height= '40%'/>
              </Box>
              <Box flexGrow={1}>
              <Typography align='center' variant='h6'>
                  Interáctua con nuestros aliados
                </Typography>
                <Typography align='center' variant='body1'>
                  Conoce a nuestros aliados, chefs y cocinas en tu ciudad que hacen posible que obtengas justo lo que quieres, justo como lo quieres.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
          <Paper className={classes.paper} direction='column'>
              <Box>
                <img src={require('./assests/Waby_column3.png')} alt='c3' width='40%' height= '40%'/>
              </Box>
              <Box flexGrow={1}>
              <Typography align='center' variant='h6'>
                  Te mantenemos informado
                </Typography>
                <Typography align='center' variant='body1'>
                Ten la informació del estado de tu plato, puedes realizar el seguimiento e interactuar en el proceso de creación del plato, todo al alcance de tu mano.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <img src={require('./assests/Waby_page4.png')} alt='middle' width='100%' height= '100%'/>

      <Footer/>
    </div>
  );
}

export default App;
