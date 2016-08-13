import React from 'react';

import css from '../styles/ResultsList.styl';
import ResultsListItem from './ResultsListItem.js';

export default class ResultsList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    let resultsMessage = 'Loading Results';
    let resultsMarkup = '';
    
    switch(this.props.status){
      case 'error' :
        resultsMessage = `No results found for &quot;${this.props.query}&quot;`;
        break;
      
      case 'success' :
        resultsMessage = (
          <h2>
            Results for <span className="results-list__query">&quot;{this.props.query}&quot;</span>
          </h2>
        );
        resultsMarkup = (
          <ul className="results-list__items">
            {this.props.results.map(this.renderResult, this)}
          </ul>
        );
        break;
    }
    
    return (
      <div className="results-list">
        {resultsMessage}
        {resultsMarkup}
      </div>
    );
  }
  
  renderResult({title, body}, ndx){
    return (
      <ResultsListItem
        key={ndx}
        title={title}
        body={body}
        query={this.props.query}
      />
    );
  }
}