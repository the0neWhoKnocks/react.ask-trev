import React from 'react';
import { db } from '../database.js';
import css from '../styles/ResultsList.styl';
import ResultsListItem from './ResultsListItem.js';

export default class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.logPrefix = '[ ResultsList ]';
  }

  filterResults(results){
    const { query } = this.props;
    let items = [];

    for(let id in results){
      const result = results[id];

      if( query && (new RegExp(query, 'i')).test(result.title) ){
        items.push(result);
      }
    }

    return items;
  }

  componentDidMount(){
    this.resultsRef = db.child('results');
    this.resultsRef.on('value', function(snapshot){
      console.log(this.logPrefix, 'Results updated');
      this.props.dataSuccess(snapshot.val());
    }.bind(this));
  }

  render(){
    let resultsMessage = {
      __html: 'Loading Results'
    };
    let resultsMarkup = '';
    const { query } = this.props;
    const filteredResults = this.filterResults(this.props.results);
    
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