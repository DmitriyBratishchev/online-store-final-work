import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Admin from './layout/admin';
import Basket from './layout/basket';
import Catalog from './layout/catalog';
import Login from './layout/login';
import Main from './layout/main';
import './app.css';
// import BreadCrumbs from './components/ui/breadCrumbs';

function App() {
  return (
    <div>
      <NavBar />
      {/* <BreadCrumbs /> */ }
      <Switch>
        <Route path="/admin" exact component={ Admin } />
        <Route path="/catalog" exact component={ Catalog } />
        <Route path="/basket" exact component={ Basket } />
        <Route path="/login/:type?" exact component={ Login } />
        <Route path='/' component={ Main } />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
