import React from 'react';
import { Link } from 'react-router';

import QAListContainer from './QAListContainer.js';

export default class ResultsPage extends React.Component {
  render(){
    return (
      <div className="page__admin">
        <QAListContainer {...this.props} />
      </div>
    );
  }
}