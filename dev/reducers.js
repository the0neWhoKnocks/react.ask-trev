import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import resultsData from '../public/data.json';

function getAutoCompleteVals({title}){
  return title;
}

export const defaultState = {
  autoComplete: resultsData.results.map(getAutoCompleteVals),
  query: '',
  results: [],
  resultsStatus: 'loading',
  createItem: false
};

/**
 * Maps state props to component props so you don't have to pass props
 * down the component chain.
 */
export function mapStateToProps(state, ownProps){
  let newState = Object.assign({}, defaultState, state);
  
  // handles first load
  if( 
    newState.query === ''
    && ownProps.params.query
  ) newState.query = ownProps.params.query;
  
  return newState;
}


function autoComplete(state = defaultState.autoComplete, action){
  return state;
}

function query(state = defaultState.query, action){
  const logPrefix = '[ REDUCER query ]';
  
  switch(action.type){
    case 'SUBMIT_QUERY' :
      console.log(logPrefix, action.text || '');
      return action.text;
      
    default :
      return state;
  }
}

function results(state = defaultState.results, action){
  const logPrefix = '[ REDUCER results ]';
  
  switch(action.type){
    case 'DATA_SUCCESS' :
      console.log(logPrefix, action.results);
      return action.results;
      
    case 'ITEM_SAVE' :
      let results = state.slice(0);
      results.push(action.item);
      
      console.log(logPrefix, results);
      return results;
      
    default :
      return state;
  }
}

function resultsStatus(state = defaultState.resultsStatus, action){
  const logPrefix = '[ REDUCER resultsStatus ]';
  
  switch(action.type){
    case 'DATA_LOADING' :
      console.log(logPrefix, 'loading');
      return 'loading';
    
    case 'DATA_SUCCESS' :
      console.log(logPrefix, 'success');
      return 'success';
    
    case 'DATA_ERROR' :
      console.log(logPrefix, 'error');
      return 'error';
      
    default :
      return state;
  }
}

function createItem(state = defaultState.createItem, action){
  const logPrefix = '[ REDUCER createItem ]';
  
  switch(action.type){
    case 'ITEM_CREATE' :
      console.log(logPrefix, true);
      return true;
    
    case 'ITEM_SAVE' :
    case 'ITEM_CANCEL_CREATE' :
      console.log(logPrefix, false);
      return false;
      
    default :
      return state;
  }
}

const reducers = combineReducers({
  autoComplete,
  query,
  results,
  resultsStatus,
  createItem,
  routing: routerReducer
});

export default reducers;