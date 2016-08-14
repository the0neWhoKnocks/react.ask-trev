import {combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux';

function autoComplete(state = [], action){
  return state;
}

function query(state = '', action){
  switch(action.type){
    case 'SUBMIT_QUERY' :
      console.log('[ SUBMIT_QUERY ]', action.text);
      return action.text;
      
    default :
      return state;
  }
}

function results(state = [], action){
  return state;
}

const reducers = combineReducers({
  autoComplete,
  query,
  results,
  routing: routerReducer
});

export default reducers;