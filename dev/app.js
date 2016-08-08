import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import css from './styles/base.styl';

import { Shell, themes } from './components/Shell.js';
import SearchPage from './components/SearchPage.js';
import ResultsPage from './components/ResultsPage.js';

function handleQuerySubmit(nextState, replace) {
  if( 
    nextState.location.state
    && nextState.location.action !== 'REPLACE'
  ){
    var token = "_query_";
    var query = nextState.location.state.body.query;
    var oldURL = nextState.location.pathname;
    
    replace(oldURL.replace(token, query));
  }
};

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Shell}>
      <IndexRoute component={SearchPage} />
      <Route 
        component={ResultsPage} 
        path="/page/results/:query"
        onEnter={handleQuerySubmit}
      />
    </Route>
  </Router>
);

render(router, document.getElementById('root'));