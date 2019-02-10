import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux'

import { Header } from './shared/Header';
import ArcadeListing from './components/arcades/arcade-listing/ArcadeListing';
import ArcadeDetail from './components/arcades/arcade-detail/ArcadeDetail';

import './App.css';

const store = require('./reducers').init();

class App extends Component {

  render() {
      return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
          <Header />
    	  <div className='container'>
        <Route exact path='/' render={() => <Redirect to='/arcades' /> }/>
    	  <Route exact path="/arcades" component={ArcadeListing} />
    	  <Route exact path="/arcades/:id" component={ArcadeDetail} />

		</div>
      </div>
    </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
