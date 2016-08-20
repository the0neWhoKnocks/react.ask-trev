import React from 'react';
import { Link } from 'react-router';

import css from '../styles/AdminNav.styl';

export default class AdminNav extends React.Component {
  getLinkData(){
    const page = this.props.location.pathname.split('/')[1];
    let data = {};
    
    switch(page){
      case 'admin' :
        data.url = '/';
        data.text = 'HOME';
        break;
        
      default :
        data.url = '/admin';
        data.text = 'ADMIN';
    }
    
    return data;
  }
  
  render(){
    const linkData = this.getLinkData();
    
    return (
      <nav className="admin-nav">
        <h2 className="admin-nav__title">Admin</h2>
        <Link className="admin-nav__home-link" to={linkData.url}>[ {linkData.text} ]</Link>
      </nav>
    );
  }
}