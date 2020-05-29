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
        background: "url("+require('../assests/Waby_screenpurple.png')+")",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width:"100%",
        height:"25%"
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
//height: '100vh'
export default function Conocenos() {
    return (
        <div style={{ backgroundColor: '#F2F2F2', position:'absolute', height:'100%', width:'100%'}}>
            <Header />
            <div style={{
                background:"url("+require('../assests/Waby_page3.png')+")",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                backgroundPosition: 'center',
                height:"300px",
                marginTop:"0%"}}>
            </div>
            <div justifyContent="center" style={{  height:'77%'}}>
                <Grid container direction='column' alignItems='center' justifyContent="center">
                    <Grid>
                        <box>
                            <h1 style={{ textAlign: 'center' }}>¿Quiénes somos?</h1>

                        </box>
                    </Grid>
                    <Grid >
                        <Typography variant='body1' textAlign='left'>
                            <p>
                                Una empresa de desarrollo dedicada al servicio de pedidos de comida online
                            </p>
                        </Typography>
                        <box>
                            <Typography variant='h6'>
                                ¿Cómo funciona Waby?
                            </Typography>
                        </box>
                        <Typography variant='body1'>
                            <p style={{ 'text-algin': 'justify' }}>
                                Haciendo uso de una amigable interfaz, y gracias a los productos suministrados por una amplia gama
                                   <br /> de proveedores alrededor del territorio local en Waby te permitimos realizar pedidos personalizados,
                                   <br /> permitiendote seleccionar entre una gran cantidad de ingredientes!
                                </p>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div >
    );
}
