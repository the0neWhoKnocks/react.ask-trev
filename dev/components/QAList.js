import React from 'react';

import css from '../styles/QAList.styl';
import QAListItem from './QAListItem.js';

export default class QAList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    let resultsMessage = {
      __html: 'Loading Results'
    };
    let resultsMarkup = '';
    const { query, results } = this.props;
    
    switch(this.props.status){
      case 'error' :
        console.error("Couldn't load results");
        break;
      
      case 'success' :
        resultsMarkup = (
          <ul className="qa-list__items">
            {results.map(this.renderResult, this)}
          </ul>
        );
        break;
    }
    
    return (
      <div className="qa-list">
        {resultsMarkup}
      </div>
    );
  }
  
  renderResult({title, body}, ndx){
    return (
      <QAListItem
        key={ndx}
        title={title}
        body={body}
      />
    );
  }
}