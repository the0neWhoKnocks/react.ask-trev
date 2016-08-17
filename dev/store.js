import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers, { defaultState } from './reducers.js';

const store = createStore(reducers, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;