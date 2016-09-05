import React from 'react';
import { generateHash, objToArray } from '../utils.js';
import { db } from '../database.js';
import css from '../styles/QAList.styl';
import QANav from './QANav.js';
import QAListItem from './QAListItem.js';

export default class QAList extends React.Component {
  constructor(props) {
    super(props);
    
    this.ids = [];
    this.logPrefix = '[ QAList ]';
  }

  componentDidMount(){
    this.resultsRef = db.child('results');
    this.resultsRef.on('value', function(snapshot){
      console.log(this.logPrefix, 'Results updated');
      this.props.dataSuccess(snapshot.val());
    }.bind(this));
  }

  render(){
    const { query, results } = this.props;
    let resultsMessage = {
      __html: 'Loading Results'
    };
    let resultsMarkup = '';
    let createMarkup = '';
    
    switch(this.props.resultsStatus){
      case 'error' :
        console.error("Couldn't load results");
        break;
      
      case 'done' :
      case 'processing' :
      case 'success' :
        this.ids = [];
        for(let i in results){
          this.ids.push(i);
        }
        
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
        
        // sort the results by newest
        let sortedResults = objToArray(results, true).slice(0);
        sortedResults = sortedResults.sort(function(a, b){
          return +b.date - +a.date;
        }, this);
        
        resultsMarkup = (
          <ul className="qa-list__items">
            {createMarkup}
            {sortedResults.map(this.renderResult, this)}
          </ul>
        );
        break;
    }
    
    return (
      <div className="qa-list">
        <QANav pos="top" {...this.props} />
        {resultsMarkup}
        {/* <QANav pos="btm" {...this.props} /> */}
      </div>
    );
  }
  
  renderResult({title, body, _id, date}, ndx){
    return (
      <QAListItem
        key={_id}
        id={_id}
        ids={this.ids}
        title={title}
        body={body}
        date={date}
        {...this.props}
      />
    );
  }
}