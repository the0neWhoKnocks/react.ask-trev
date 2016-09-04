import React from 'react';

import css from '../styles/ResultsList.styl';
import ResultsListItem from './ResultsListItem.js';

export default class ResultsList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    let resultsMessage = {
      __html: 'Loading Results'
    };
    let resultsMarkup = '';
    const { query, filteredResults } = this.props;
    
    switch(this.props.resultsStatus){
      case 'error' :
        resultsMessage.__html = `No results found for &quot;${query}&quot;`;
        break;
      
      case 'success' :
        if( filteredResults.length ){
          resultsMessage.__html = `Results for <span className="results-list__query">&quot;${query}&quot;</span>`;
          resultsMarkup = (
            <ul className="results-list__items">
              {filteredResults.map(this.renderResult, this)}
            </ul>
          );
        }else{
          resultsMessage.__html = `No results found for &quot;${query}&quot;`;
        }
        break;
    }
    
    return (
      <div className="results-list">
        <h2 dangerouslySetInnerHTML={resultsMessage} />
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