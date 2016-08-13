import React from 'react';

import css from '../styles/ResultsListItem.styl';

export default class ResultsListItem extends React.Component {
  formatTitle(text){
    return {
      __html: text.replace(new RegExp(`(${this.props.query})`, 'ig'), "<mark>$1</mark>")
    };
  }
  
  render(){
    const title = this.formatTitle(this.props.title);
    
    return (
      <li className="results-list-item">
        <h3 className="results-list-item__title" dangerouslySetInnerHTML={title} />
        <p className="results-list-item__body">{this.props.body}</p>
      </li>
    );
  }
}