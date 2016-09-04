import React from 'react';
import { db } from '../database.js';
import { saveData } from '../utils.js';

export default class DataContainer extends React.Component {
  static get defaultProps(){
    return {
      dataSource: '/data.json'
    };
  }
  
  /**
   * Saves a local copy of the data for offline viewing.
   * 
   * @param {object} data - The response data.
   */
  saveLocalData(data){
    // TODO - this is hacky
    const dataIsSame = JSON.stringify(data) === JSON.stringify({results:this.props.results});
    
    if( 
      // only try to save if the data wasn't already loaded locally
      !/^\/data/.test(this.props.dataSource)
      // or the data is not the same
      || !dataIsSame
    ){
      saveData(data);
    }
  }
  
  getData(){
    const query = this.props.query;
    const _self = this;
    
    if( 
      query !== null 
      && query !== ''
      || this.props.noFilter
    ){  
      this.props.dataLoading();
      
      const resultsRef = db.child('results');
      resultsRef.on('value', snap => {
        const results = snap.val();
        let items = [];
        
        for(let id in results){
          const result = results[id];
          
          if( query && (new RegExp(query, 'i')).test(result.title) ){                
            items.push(result);
          }else if( _self.props.noFilter ){
            items.push(result);
          }
        }
        
        if( !_self.props.noFilter ){
          _self.props.dataFiltered(items);
        }
        
        _self.props.dataSuccess(results);
        _self.saveLocalData({
          results: results
        });
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
    return (
      <this.props.component {...this.props}/>
    );
  }
}