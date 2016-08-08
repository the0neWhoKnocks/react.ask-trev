import React from 'react';
import { Link } from 'react-router';
import Form from 'react-router-form';

import css from '../styles/SearchPage.styl';
import Search from './Search.js';

export default class SearchPage extends React.Component {
  static get defaultProps() {
    return {
      placeholder: 'Enter Question'
    };
  }
  
  render() {
    return (
      <div className="page__search">
        <Search/>
      </div>
    );
  }
}