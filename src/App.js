import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux'

import Header from './shared/Header';
import ArcadeListing from './components/arcades/arcade-listing/ArcadeListing';
import ArcadeDetail from './components/arcades/arcade-detail/ArcadeDetail';
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
        <Route exact path='/' render={() => <Redirect to='/arcades' /> }/>
    	  <Route exact path='/arcades' component={ArcadeListing} />
    	  <ProtectedRoute exact path='/arcades/:id' component={ArcadeDetail} />
        <Route exact path='/login' component={Login} />
        <LoggedInRoute exact path='/register' component={Register} />




		</div>
      </div>
    </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
