import './app.css';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Admin from './layout/admin';
import Basket from './components/page/basket/basket';
import Catalog from './layout/catalog';
import Login from './layout/login';
import Main from './layout/main';
import AppLoader from './components/ui/hoc/appLoader';
import Favorites from './components/page/favorites';

function App() {
  return (
    <div className='h-100'>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/admin/:page" render={ props => <Admin { ...props } /> } />
          <Route path="/catalog" exact component={ Catalog } />
          <Route path="/basket" exact component={ Basket } />
          <Route path="/favorites" exact component={ Favorites } />
          <Route path="/login/:type?" exact component={ Login } />
          <Route path='/' component={ Main } />
          <Redirect to='/' />
        </Switch>

      </AppLoader>
    </div>
  );
}

export default App;
