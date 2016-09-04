import React from 'react';
import { Link } from 'react-router';

import { userStatuses } from '../reducers.js';
import { logUserOut } from '../database.js';
import css from '../styles/AdminNav.styl';

export default class AdminNav extends React.Component {
  getLinkData(){
    const page = this.props.location.pathname.split('/')[1];
    let data = {};
    
    switch(page){
      case 'admin' :
        data.url = '/';
        data.text = 'Home';
        break;
        
      default :
        data.url = '/admin';
        data.text = 'Admin';
    }
    
    return data;
  }
  
  handleLogoutClick(ev){
    logUserOut();
    this.props.loggedOut();
  }
  
  render(){
    const linkData = this.getLinkData();
    let navMarkup;
    
    switch(this.props.userStatus){
      case userStatuses.LOGGED_IN :
        navMarkup = (
          <nav className="admin-nav">
            <h2 className="admin-nav__title">Admin</h2>
            <div className="admin-nav__btns">
              <button
                className="admin-nav__btn"
                type="button"
                onClick={this.handleLogoutClick.bind(this)}
              >Logout</button>
              <Link className="admin-nav__btn" to={linkData.url}>{linkData.text}</Link>
            </div>
          </nav>
        );
        break;
        
      default :
        navMarkup = null;
    }
    
    return navMarkup;
  }
}