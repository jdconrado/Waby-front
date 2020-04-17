import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export default class Header extends React.Component {
    
    constructor(props) {
        super(props);
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

    render() {
        
        let buttons

        if (this.logged){
            buttons =  [
                [<Button className={this.styles.button} color='inherit' href = "/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit'>Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit'>Conocenos</Button>]
            ]
        } else {
            buttons =  [
                [<Button className={this.styles.button} color='inherit' href = "/">Inicio</Button>],
                [<Button className={this.styles.button} color='inherit' href= "/orders">Pide aquí</Button>],
                [<Button className={this.styles.button} color='inherit'>Conocenos</Button>], 
                [<Button className={this.styles.button} color='inherit' href = "/login">Log in</Button>],              
                [<Button className={this.styles.button} color='inherit' href = "/signup">Sign up</Button>]
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