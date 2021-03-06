import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mapStateToProps } from './reducers.js';
import store, { history } from './store.js';
import * as actions from './actions.js';
import { Shell, themes } from './components/Shell.js';
import AdminPage from './components/AdminPage.js';
import SearchPage from './components/SearchPage.js';
import ResultsPage from './components/ResultsPage.js';


function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Shell);

const router = (
  <Provider store={store}>  
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SearchPage} />
        <Route 
          component={ResultsPage} 
          path="/results(/:query)"
        />
        <Route 
          component={AdminPage} 
          path="/admin"
        />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));