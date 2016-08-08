import React from 'react';

import css from '../styles/ResultsPage.styl';
import Search from './Search.js';

export default class ResultsPage extends React.Component {
  render() {
    var query = this.props.params.query;
    
    return (
      <div className="page__results">
        <Search query={query} />
        
        <h1>Results</h1>
      </div>
    );
  }
}