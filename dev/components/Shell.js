import React from 'react';

import css from '../styles/base.styl';

export let themes = {
  DEFAULT: 'default',
  DARK: 'dark'
};

export class Shell extends React.Component {
  static get defaultProps() {
    return {
      theme: themes.DEFAULT
    };
  }
  
  render() {
    return (
      <div className={this.props.theme}>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}