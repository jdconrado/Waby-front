import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from './components/singin';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './components/signup';
import Orders from './components/orders';
import Admin from './components/admin';
import Historial from './components/historial';
import Profile from './components/profile';
import AdminPage from './components/admin-page';
import Pedidos from './components/pedidos';

    

    const routing = (
        <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/orders" component={Orders}/>
            <Route path="/admin/ingredientes" component={Admin}/>
            <Route exact path ="/user/:id" component={Profile}/>
            <Route exact path="/user/:id/historial" component={Historial} />
            <Route exact path="/user/:id/pedidos" component={Pedidos} />
            <Route path="/admin" component={AdminPage}/>
            
        </div> 
        </Router>
    )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
