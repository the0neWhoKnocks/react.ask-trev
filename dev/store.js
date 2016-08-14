import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from './reducers.js';
import resultsData from '../public/data.json';

function getAutoCompleteVals({title}){
  return title;
}

const defaultState = {
  autoComplete: resultsData.results.map(getAutoCompleteVals),
  query: '',
  results: []
};
const store = createStore(reducers, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;