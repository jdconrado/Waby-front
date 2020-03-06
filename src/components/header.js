import React from 'react';
import {AppBar, Toolbar, Button, Box} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.styles =  makeStyles(theme=>({
            root:{
                flexGrow: 1
            },
            bar:{
                backgroundColor: '#AF67E6'
            }
        }));
    }

    static defaultProps = {
    }

    render(){
        return(
            <div style={{flexGrow:1}}>
                <AppBar style={{backgroundColor:'#AF67E6'}}>
                    <Toolbar>
                        <Box edge='start' py='0.5rem' flexGrow={1} >
                            <img src={require('../assests/Logo_white.png')} width='7%' height='7%' alt="logo"/> 
                        </Box>
                        
                        <Button className={this.styles.button} color='inherit'>Pide aquí</Button>
                        <Button className={this.styles.button} color='inherit'>Conocenos</Button>
                        <Button className={this.styles.button} color='inherit'>Log in</Button>
                        
                    </Toolbar>
                </AppBar>
                <Toolbar/>
            </div>
        );
    }
}