import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Catalog from './laiout/catalog';
import Basket from './laiout/basket';
import Login from './laiout/login';
import Main from './laiout/main';

const RouterMain = () => {
  console.log('router');
  return (
    <>
      <Switch>
        <Route path="/catalog" exact component={ Catalog } />
        <Route path="/basket" exact component={ Basket } />
        <Route path="/login/:type?" exact component={ Login } />
        <Route path='/' component={ Main } />
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default RouterMain;
