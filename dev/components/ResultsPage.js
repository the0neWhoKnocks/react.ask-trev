import React from 'react';

import css from '../styles/ResultsPage.styl';
import Search from './Search.js';
import ResultsListContainer from './ResultsListContainer.js';

export default class ResultsPage extends React.Component {
  render() {
    const query = this.props.params.query;
    
    return (
      <div className="page__results">
        <Search query={query} />
        <ResultsListContainer query={query} />
      </div>
    );
  }
}