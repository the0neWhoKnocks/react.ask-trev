import React from 'react';

import css from '../styles/Button.styl';

export default class Button extends React.Component {
  static get propTypes() {
    return {
      type: React.PropTypes.string,
      extraClasses: React.PropTypes.string,
      inlineIcon: React.PropTypes.string
    };
  }
  
  static get defaultProps() {
    return {
      type: 'button',
      extraClasses: '',
      inlineIcon: ''
    };
  }
  
  render() {
    let elClass = 'btn';
    let { extraClasses, inlineIcon, ...filteredProps } = this.props;
    
    if( extraClasses !== '' ){
      elClass += ` ${extraClasses}`;
    }
    
    if( inlineIcon !== '' ){
      inlineIcon = (
        <div className="btn__icon">{inlineIcon}</div>
      );
      elClass += ' has--icon';
    }
    
    return (
      <button className={elClass} {...filteredProps}>
        {inlineIcon}
        <div className="btn__body">{this.props.children}</div>
      </button>
    );
  }
}