import React from 'react';
import { Link } from 'react-router';

import { userStatuses } from '../reducers.js';
import Login from './Login.js';
import QAList from './QAList.js';

export default class AdminPage extends React.Component {
  render(){
    let view;
    
    switch(this.props.userStatus){ 
      case userStatuses.LOGGED_IN :
        view = (
          <QAList {...this.props} />
        );
        break;
      
      default :
        view = (
          <Login {...this.props} />
        );
        break;
    }
    
    return (
      <div className="page__admin">
        {view}
      </div>
    );
  }
}