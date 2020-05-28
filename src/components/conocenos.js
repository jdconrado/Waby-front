import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Footer from './footer';
import { Grid, Box, Typography, Paper } from '@material-ui/core'


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
export default function Conocenos() {
    return (
        <div style={{ backgroundColor: '#F2F2F2' }}>
            <Header />
            <div justifyContent="center">
                <Grid container direction='column' alignItems='center' justifyContent="center">
                    <Grid>
                        <box>
                            <Typography variant='h3'>
                                ¿Quiénes somos?
                            </Typography>
                        </box>
                        <Typography variant='body1'>
                            <p align="justify">
                            Una empresa de desarrollo dedicada al servicio de pedidos de comida online
                            </p>
                        </Typography>
                    </Grid>
                    <Grid >
                        <box>
                            <Typography variant='h3'>
                                ¿Cómo funciona Waby?
                            </Typography>
                        </box>
                        <Typography variant='body1' textAlign="left">
                               <p textAlign="left">
                                         Haciendo uso de una amigable interfaz, y gracias a los productos suministrados por una amplia gama 
                                   <br/> de proveedores alrededor del territorio local en Waby te permitimos realizar pedidos personalizados, 
                                   <br/> permitiendote seleccionar entre una gran cantidad de ingredientes! 
                                </p>
                        </Typography>
                    </Grid>
                    



                </Grid>
            </div>
            <Footer />
        </div >
    );
}