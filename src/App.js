import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux'

import Header from './shared/Header';
import ArcadeListing from './components/arcades/arcade-listing/ArcadeListing';
import ArcadeSearchListing from './components/arcades/arcade-listing/ArcadeSearchListing';
import ArcadeDetail from './components/arcades/arcade-detail/ArcadeDetail';
import { ArcadeCreate } from './components/arcades/arcade-create/ArcadeCreate';
import Login from 'components/login/Login';
import { Register } from 'components/register/Register';

import { ProtectedRoute } from 'shared/auth/ProtectedRoute';
import { LoggedInRoute } from 'shared/auth/LoggedInRoute';

import * as actions from 'actions';

import './App.css';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
      return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
          <Header logout={this.logout}/>
    	  <div className='container'>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/arcades' /> }/>
      	  <Route exact path='/arcades' component={ArcadeListing} />
          <Route exact path='/arcades/:city/homes' component={ArcadeSearchListing} />
          <ProtectedRoute exact path='/arcades/new' component={ArcadeCreate} />
      	  <ProtectedRoute exact path='/arcades/:id' component={ArcadeDetail} />
          <Route exact path='/login' component={Login} />
          <LoggedInRoute exact path='/register' component={Register} />
        </Switch>
		</div>
      </div>
    </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
