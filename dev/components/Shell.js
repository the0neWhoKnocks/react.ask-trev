import React from 'react';

import css from '../styles/base.styl';
import AdminNav from './AdminNav.js';

export let themes = {
  DEFAULT: 'has--default-theme',
  DARK: 'has--dark-theme'
};

export class Shell extends React.Component {
  static get defaultProps() {
    return {
      theme: themes.DEFAULT
    };
  }
  
  render() {
    let overlayProps = {
      className: 'overlay'
    };
    
    switch(this.props.resultsStatus){  
      case 'processing' :
        overlayProps.className = overlayProps.className +' is--processing';
        break;
    }
    
    return (
      <div className={'shell '+ this.props.theme}>
        <AdminNav {...this.props} />
        {React.cloneElement(this.props.children, this.props)}
        <div {...overlayProps} />
      </div>
    );
  }
}