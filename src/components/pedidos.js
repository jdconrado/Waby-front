import React from 'react';
import Header from './header'
import Historial from './historial'


export default function Pedidos() {
    return (
        <div style={{ flexGrow: 1 }} >
            <Header />
            {<Historial staticContext={true}/>}
        </div>
    );
}