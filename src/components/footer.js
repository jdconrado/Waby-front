import React from 'react';
import {Box} from '@material-ui/core';

export default class Footer extends React.Component{
    render(){
        return(
            <div>
                <Box bgcolor='#29F077' textAlign='center' py='2rem' alignContent='center' color='#ffffff'>
                    Waby&copy; 2020
                </Box>
            </div>
        );
    }
}