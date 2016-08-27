import React from 'react';

import css from '../styles/QANav.styl';
import Button from './Button.js';

export default class QANav extends React.Component {
  constructor(props){
    super(props);
    
    this.pos = {
      TOP: 'top',
      BTM: 'btm'
    };
  }
  
  static get propTypes() {
    return {
      pos: React.PropTypes.string
    };
  }
  
  static get defaultProps() {
    return {
      pos: 'top'
    };
  }
  
  handleCreateClick(ev){
    this.props.itemCreate();
  }
  
  render(){ 
    let elClass = 'qa-nav';
    const { pos, ...filteredProps } = this.props;
    
    switch(pos){
      case this.pos.TOP :
        elClass += ' is--top';
        break;
        
      case this.pos.BTM :
        elClass += ' is--btm';
        break;
    }
    
    return (
      <nav className={elClass}>
        <Button
          extraClasses="qa-nav__btn"
          inlineIcon="+"
          onClick={this.handleCreateClick.bind(this)}
        >Create</Button>
      </nav>
    );
  }
}