import React from 'react';
import { generateHash } from '../utils.js';

import css from '../styles/QAList.styl';
import QANav from './QANav.js';
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
    let createMarkup = '';
    const { query, results } = this.props;
    
    switch(this.props.resultsStatus){
      case 'error' :
        console.error("Couldn't load results");
        break;
      
      case 'success' :
        this.ids = results.map(function(item){
          return item.id;
        });
        
        if( this.props.createItem ){
          const hash = generateHash('__Creating__');
          
          createMarkup = (
            <QAListItem
              key={hash}
              id={hash}
              ids={this.ids}
              title=""
              body=""
              isNew={true}
              date={Date.now()}
              {...this.props}
            />
          );
        }
        
        resultsMarkup = (
          <ul className="qa-list__items">
            {createMarkup}
            {results.map(this.renderResult, this)}
          </ul>
        );
        break;
    }
    
    return (
      <div className="qa-list">
        <QANav pos="top" {...this.props} />
        {resultsMarkup}
        <QANav pos="btm" {...this.props} />
      </div>
    );
  }
  
  renderResult({title, body, id, date}, ndx){
    return (
      <QAListItem
        key={id}
        id={id}
        ids={this.ids}
        title={title}
        body={body}
        date={date}
        {...this.props}
      />
    );
  }
}