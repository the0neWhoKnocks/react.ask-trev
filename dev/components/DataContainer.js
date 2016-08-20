import React from 'react';

export default class DataContainer extends React.Component {
  static get defaultProps(){
    return {
      dataSource: '/data.json'
    };
  }
  
  getData(){
    const query = this.props.query;
    let _self = this;
    
    if( 
      query !== null 
      && query !== ''
      || this.props.noFilter
    ){
      let req = new Request(this.props.dataSource);
        
      this.props.dataLoading();
      
      fetch(req)
        .then(function(resp){
          if(resp.status !== 200 ){
            console.error('[ ERROR ]', resp.status, "Couldn't retrieve data.");
            _self.props.dataError();
          }

          resp.json().then(function(data){
            let items = [];
            
            for(let i=0; i<data.results.length; i++){
              const result = data.results[i];
              
              if( query && (new RegExp(query, 'i')).test(result.title) ){                
                items.push(result);
              }else if( _self.props.noFilter ){
                items.push(result);
              }
            }
            
            _self.props.dataSuccess(items);
          });
        })
        .catch(function(err){
          console.error('[ ERROR ]', err);
          _self.props.dataError();
        });
    }else if( query === '' ){
      console.warn('[ WARN ] No query entered');
      _self.props.dataError();
    }
  }
  
  componentDidMount(){
    this.getData();
  }
  
  componentDidUpdate(nextProps, nextState){
    if( 
      this.props.query !== null
      && nextProps.query !== this.props.query
    ){
      this.getData();
    }
  }
  
  render(){
    let componentProps = {
      results: this.props.results,
      status: this.props.resultsStatus
    };
    
    if( this.props.query ) componentProps.query = this.props.query;
    
    return (
      <this.props.component {...componentProps}/>
    );
  }
}