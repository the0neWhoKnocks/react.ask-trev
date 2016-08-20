import React from 'react';
import { Link } from 'react-router';

import DataContainer from './DataContainer.js';
import QAList from './QAList.js';

export default class ResultsPage extends React.Component {
  render(){
    return (
      <div className="page__admin">
        <DataContainer
          {...this.props}
          component={QAList}
        />
      </div>
    );
  }
}