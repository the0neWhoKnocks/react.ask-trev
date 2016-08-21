import React from 'react';

import css from '../styles/QAList.styl';
import QAListItem from './QAListItem.js';

export default class QAList extends React.Component {
  constructor(props) {
    super(props);
    
    this.ids = [];
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
        this.ids = results.map(function(item){
          return item.id;
        });
        
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
  
  renderResult({title, body, id}, ndx){
    return (
      <QAListItem
        key={id}
        id={id}
        ids={this.ids}
        title={title}
        body={body}
      />
    );
  }
}