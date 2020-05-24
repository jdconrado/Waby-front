import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
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
        this.state = { id: -1 }
        this.styles = makeStyles(theme => ({
            root: {
                flexGrow: 1
            },
            bar: {
                backgroundColor: '#AF67E6'
            }
        }));
        this.logged = false
    }
    static defaultProps = {
    }
    componentDidMount() {
        let token = localStorage.getItem("id");
        if (token != null) {
            const url = `http://127.0.0.1:8000/usuarios/getid/${token}`
            const response = fetch(url, {
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
            }).then((dat) => { this.setState({id: dat.result}) ; console.log(dat); console.log(this.state.id) });
        }
    }
    
    logOut = () => {
        let token = localStorage.getItem("id");
        url(`http://127.0.0.1:8000/usuarios/logout/${token}`).then(localStorage.removeItem("id")).then(window.location.href="http://localhost:3000/")
    }

    render() {


        let buttons
        if (localStorage.getItem("id") == null) {
            this.logged = false;
        } else {
            this.logged = true;

        }
        if (this.logged) {
            console.log(this.state.id)
            buttons = [
                [<Button className={this.styles.button} color='inherit' href="/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href="/orders">Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit'>Conocenos</Button>],
                [<Button className={this.styles.button} color='inherit' href={`/user/${this.state.id}`}>
                    PERFIL </Button>],
                [<Button className={this.styles.button} color='inherit' onClick={this.logOut}>Cerrar sesión</Button>],
            ]
        } else {
            buttons = [
                [<Button className={this.styles.button} color='inherit' href="/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href="/signup">Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit'>Conocenos</Button>],
                [<Button className={this.styles.button} color='inherit' href="/login">Log in</Button>],
                [<Button className={this.styles.button} color='inherit' href="/signup">Sign up</Button>]
            ]

        }

        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar style={{ backgroundColor: '#AF67E6' }}>
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
