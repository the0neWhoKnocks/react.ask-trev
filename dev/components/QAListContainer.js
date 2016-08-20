import React from 'react';

import QAList from './QAList.js';

export default class QAListContainer extends React.Component {
  static get defaultProps(){
    return {
      resultsSource: '/data.json'
    };
  }
  
  getResults(){
    let _self = this;
    let req = new Request(this.props.resultsSource);
    
    this.props.resultsLoading();
    
    fetch(req)
      .then(function(resp){
        if(resp.status !== 200 ){
          console.error('[ ERROR ]', resp.status, "Couldn't retrieve results.");
          _self.props.resultsError();
        }

        resp.json().then(function(data){
          let resultItems = [];
          
          for(let i=0; i<data.results.length; i++){
            resultItems.push(data.results[i]);
          }
          
          _self.props.resultsSuccess(resultItems);
        });
      })
      .catch(function(err){
        console.error('[ ERROR ]', err);
        _self.props.resultsError();
      });
  }
  
  componentDidMount(){
    this.getResults();
  }
  
  render(){
    return (
      <QAList 
        results={this.props.results}
        status={this.props.resultsStatus}
      />
    );
  }
}