import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { db } from './database.js';
import { saveData, objToArray } from './utils.js';

import resultsData from '../public/data.json';

const resultsRef = db.child('results');
export const userStatuses = {
  LOGGED_IN: 'loggedIn',
  LOGGED_OUT: 'loggedOut',
  LOGIN_FAILURE: 'loginFailure',
  LOGIN_PENDING: 'loginPending',
  CHECKING: 'checking'
};

function getAutoCompleteVals({title}){
  return title;
}

export const defaultState = {
  autoComplete: objToArray(resultsData.results).map(getAutoCompleteVals),
  query: '',
  results: {},
  filteredResults: {},
  resultsStatus: 'loading',
  createItem: false,
  userStatus: userStatuses.LOGGED_OUT,
  errorMessage: ''
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


function autoComplete(state = defaultState.autoComplete, action = {}){
  return state;
}

function query(state = defaultState.query, action = {}){
  const logPrefix = '[ REDUCER query ]';
  
  switch(action.type){
    case 'SUBMIT_QUERY' :
      console.log(logPrefix, action.text || '');
      return action.text;
      
    default :
      return state;
  }
}

function results(state = defaultState.results, action = {}){
  const logPrefix = '[ REDUCER results ]';
  let newResults, ndx, i;
  
  switch(action.type){
    case 'DATA_SUCCESS' :
    case 'DATA_DONE_PROCESSING' :
      console.log(logPrefix, action.results);
      return action.results;
      
    case 'ITEM_SAVE' :
      newResults = JSON.parse(JSON.stringify(state));
      newResults[action.id] = action.item;
      
      saveData({
        results: newResults
      }, function(){
        if( action.callback ) action.callback(newResults);
      });
      
      return state;
    
    case 'ITEM_UPDATE' :
      newResults = JSON.parse(JSON.stringify(state));
      delete newResults[action.oldId];
      newResults[action.id] = action.item;
      
      saveData({
        results: newResults
      }, function(){
        if( action.callback ) action.callback(newResults);
      });
      
      return state;
    
    case 'ITEM_DELETE' :
      newResults = JSON.parse(JSON.stringify(state));
      delete newResults[action.id];
      
      saveData({
        results: newResults
      }, function(){
        if( action.callback ) action.callback(newResults);
      });
      
      return state;
      
    default :
      return state;
  }
}

function filteredResults(state = defaultState.filteredResults, action = {}){
  const logPrefix = '[ REDUCER filteredResults ]';
  let results, ndx, i;
  
  switch(action.type){
    case 'DATA_FILTERED' :
      console.log(logPrefix, action.filteredResults);
      return action.filteredResults;
      
    default :
      return state;
  }
}

function resultsStatus(state = defaultState.resultsStatus, action = {}){
  const logPrefix = '[ REDUCER resultsStatus ]';
  
  switch(action.type){
    case 'DATA_LOADING' :
      console.log(logPrefix, 'loading');
      return 'loading';
    
    case 'DATA_PROCESSING' :
      console.log(logPrefix, 'processing');
      return 'processing';
    
    case 'DATA_DONE_PROCESSING' :
      console.log(logPrefix, 'done');
      return 'done';
    
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

function createItem(state = defaultState.createItem, action = {}){
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

function userStatus(state = defaultState.userStatus, action = {}){
  const logPrefix = '[ REDUCER userStatus ]';
  
  switch(action.type){
    case 'LOGIN_PENDING' :
      console.log(logPrefix, userStatuses.LOGIN_PENDING);
      return userStatuses.LOGIN_PENDING;
    
    case 'LOGIN_SUCCESS' :
      console.log(logPrefix, userStatuses.LOGGED_IN);
      return userStatuses.LOGGED_IN;
    
    case 'LOGIN_FAILURE' :
      console.log(logPrefix, userStatuses.LOGIN_FAILURE);
      return userStatuses.LOGIN_FAILURE;
    
    case 'LOGGED_OUT' :
      console.log(logPrefix, userStatuses.LOGGED_OUT);
      return userStatuses.LOGGED_OUT;
      
    default :
      return state;
  }
}

function errorMessage(state = defaultState.errorMessage, action = {}){
  const logPrefix = '[ REDUCER errorMessage ]';
  
  switch(action.type){
    case 'SET_ERROR_MESSAGE' :
      if( action.msg === '' ){        
        console.log(logPrefix, action.msg);
      }else{
        console.error(logPrefix, action.msg);
      }
      return action.msg;
      
    default :
      return state;
  }
}

const reducers = combineReducers({
  autoComplete,
  query,
  results,
  filteredResults,
  resultsStatus,
  createItem,
  userStatus,
  errorMessage,
  routing: routerReducer
});

export default reducers;