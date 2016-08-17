import React from 'react';

import ResultsList from './ResultsList.js';

export default class ResultsListContainer extends React.Component {
  static get defaultProps(){
    return {
      resultsSource: '/data.json'
    };
  }
  
  getResults(){
    const query = this.props.query;
    let _self = this;
    
    if( query !== '' ){
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
              const result = data.results[i];
              
              // filter based on query
              if( (new RegExp(query, 'i')).test(result.title) ){                
                resultItems.push(result);
              }
            }
            
            _self.props.resultsSuccess(resultItems);
          });
        })
        .catch(function(err){
          console.error('[ ERROR ]', err);
          _self.props.resultsError();
        });
    }else{
      console.warn('[ WARN ] No query entered');
      _self.props.resultsError();
    }
  }
  
  componentDidMount(){
    this.getResults();
  }
  
  componentDidUpdate(nextProps, nextState){
    if( nextProps.query !== this.props.query ){
      this.getResults();
    }
  }
  
  render(){
    return (
      <ResultsList 
        results={this.props.results}
        status={this.props.resultsStatus}
        query={this.props.query}
      />
    );
  }
}