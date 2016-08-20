import React from 'react';
import { Link } from 'react-router';

import css from '../styles/QAListItem.styl';

export default class QAListItem extends React.Component {
  handleItemEdit(ev){
    alert('swap static items to editable ones\ndisable edit & delete\nshow save');
  }
  
  handleItemDelete(ev){
    alert('delete item');
  }
  
  render(){
    return (
      <li className="qa-list-item">
        <div className="qa-list-item__container">
          <h3 className="qa-list-item__title">{this.props.title}</h3>
          <p className="qa-list-item__body">{this.props.body}</p>
        </div>
        <nav className="qa-list-item__nav">
          <button 
            type="button" 
            className="qa-list-item__nav-btn"
            onClick={this.handleItemEdit}
          >EDIT</button>
          <button 
            type="button" 
            className="qa-list-item__nav-btn"
            onClick={this.handleItemDelete}
          >DEL</button>
        </nav>
      </li>
    );
  }
}