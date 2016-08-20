import React from 'react';

import css from '../styles/ResultsPage.styl';
import Search from './Search.js';
import ResultsList from './ResultsList.js';
import DataContainer from './DataContainer.js';

export default class ResultsPage extends React.Component {
  render(){
    return (
      <div className="page__results">
        <Search {...this.props} />
        <DataContainer 
          {...this.props}
          component={ResultsList}
        />
      </div>
    );
  }
}