import React from 'react';

import css from '../styles/ResultsPage.styl';
import Search from './Search.js';
import ResultsListContainer from './ResultsListContainer.js';

export default class ResultsPage extends React.Component {
  componentWillMount(){
    // TODO - ideally this'd happen in `store.js` in `defaultState`
    this.props.submitQuery(this.props.params.query);
  }
  
  render(){
    return (
      <div className="page__results">
        <Search {...this.props} />
        <ResultsListContainer {...this.props} />
      </div>
    );
  }
}