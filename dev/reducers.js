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
  resultsStatus: 'loading'
};

/**
 * Maps state props to component props so you don't have to pass props
 * down the component chain.
 */
export function mapStateToProps(state, ownProps){
  let newState = Object.assign({}, defaultState, state);
  
  // handles first load
  if( newState.query === '' ) newState.query = ownProps.params.query;
  
  return newState;
}


function autoComplete(state = defaultState.autoComplete, action){
  return state;
}

function query(state = defaultState.query, action){
  switch(action.type){
    case 'SUBMIT_QUERY' :
      console.log('[ REDUCER query ]', action.text);
      return action.text;
      
    default :
      return state;
  }
}

function results(state = defaultState.results, action){
  switch(action.type){
    case 'RESULTS_SUCCESS' :
      console.log('[ REDUCER results ]', action.results);
      return action.results;
      
    default :
      return state;
  }
}

function resultsStatus(state = defaultState.resultsStatus, action){
  switch(action.type){
    case 'RESULTS_LOADING' :
      console.log('[ REDUCER resultsStatus ] loading');
      return 'loading';
    
    case 'RESULTS_SUCCESS' :
      console.log('[ REDUCER resultsStatus ] success');
      return 'success';
    
    case 'RESULTS_ERROR' :
      console.log('[ REDUCER resultsStatus ] error');
      return 'error';
      
    default :
      return state;
  }
}

const reducers = combineReducers({
  autoComplete,
  query,
  results,
  resultsStatus,
  routing: routerReducer
});

export default reducers;