import React from 'react';

import ResultsList from './ResultsList.js';

export default class ResultsListContainer extends React.Component {
  constructor(){
    super();
    
    this.state = {
      status: 'loading',
      results: []
    };
  }
  
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
      
      fetch(req)
        .then(function(resp){
          if(resp.status !== 200 ){
            console.error('[ ERROR ]', resp.status, "Couldn't retrieve results.");
            
            _self.setState({
              status: 'error',
              results: []
            });
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
            
            _self.setState({
              status: 'success',
              results: resultItems
            });
          });
        })
        .catch(function(err){
          console.error('[ ERROR ]', err);
          
          _self.setState({
            status: 'error',
            results: []
          });
        });
    }else{
      console.warn('[ WARN ] No query entered');
          
      _self.setState({
        status: 'error',
        results: []
      });
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
        results={this.state.results}
        status={this.state.status}
        query={this.props.query}
      />
    );
  }
}