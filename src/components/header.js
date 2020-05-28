import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

async function url(url = '') {
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
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = { id: -1, open: true, isAdmin: false }
        this.styles = makeStyles(theme => ({
            root: {
                flexGrow: 1
            },
            bar: {
                backgroundColor: '#29F077'
            },
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }));
        this.logged = false;
    }
    static defaultProps = {
    }
    componentDidMount() {
        if (this.state.id == -1) {
            console.log("DidMount");
            console.log(this.state.id);
            let token = localStorage.getItem("id");
            if (token != null) {
                const url = `http://waby.tk/API/usuarios/getid/${token}`
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                }).then((dat) => {
                    if (dat.result != "Something went wrong") {
                        console.log(dat);
                        this.setState({ id: dat.result, open: false, isAdmin: dat.admin });
                    } else {
                        this.logged = false;
                        localStorage.removeItem("id");
                    }
                });
            } else {
                this.setState({ open: false })
            }
        }

    }

    logOut = () => {
        let token = localStorage.getItem("id");
        url(`http://waby.tk/API/usuarios/logout/${token}`).then((dat) => { window.location.href = "http://waby.tk" }).then(localStorage.removeItem("id"))
    }

    render() {


        let buttons
        if (localStorage.getItem("id") == null) {
            this.logged = false;
        } else {
            this.logged = true;
        }
        if (this.logged && this.state.isAdmin) {
            buttons = [
                [<Button className={this.styles.button} color='inherit' href="/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href="/admin">Panel</Button>],
                [<Button className={this.styles.button} color='inherit' href={`/user/${this.state.id}`}> PERFIL </Button>],
                [<Button className={this.styles.button} color='inherit' onClick={this.logOut}>Cerrar sesión</Button>],
            ]
        } else if (this.logged && !this.state.isAdmin) {
            buttons = [
                [<Button className={this.styles.button} color='inherit' href="/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href="/orders">Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit' href="/conocenos">Conocenos</Button>],
                [<Button className={this.styles.button} color='inherit' href={`/user/${this.state.id}`}> PERFIL </Button>],
                [<Button className={this.styles.button} color='inherit' onClick={this.logOut}>Cerrar sesión</Button>],
                
            ]
        } else {
            buttons = [
                [<Button className={this.styles.button} color='inherit' href="/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href="/signup">Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit' href="/conocenos">Conocenos</Button>],
                [<Button className={this.styles.button} color='inherit' href="/login">Log in</Button>],
                [<Button className={this.styles.button} color='inherit' href="/signup">Sign up</Button>]
            ]

        }

        return (
            <div style={{ flexGrow: 1 }}>
                <Backdrop className={this.styles.backdrop} open={this.state.open} style={{ zIndex: 3 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <AppBar style={{ backgroundColor: '#29F077' }}>
                    <Toolbar>
                        <Box edge='start' py='0.5rem' flexGrow={1} >
                            <img src={require('../assests/Logo_white.png')} width='7%' height='7%' alt="logo" />
                        </Box>

                        {buttons}

                    </Toolbar>
                </AppBar>
                <Toolbar />
            </div>
        );
    }
}
