import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Admin from './laiout/admin';
import Basket from './laiout/basket';
import Catalog from './laiout/catalog';
import Login from './laiout/login';
import Main from './laiout/main';
// import BreadCrumbs from './components/ui/breadCrumbs';

function App() {
  return (
    <div>
      <NavBar />
      {/* <BreadCrumbs /> */ }
      <Switch>
        <Route path="/admin" exact component={ Admin } />
        <Route path="/basket" exact component={ Basket } />
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
