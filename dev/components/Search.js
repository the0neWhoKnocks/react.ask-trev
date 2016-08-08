import React from 'react';
import { Link } from 'react-router';
import Form from 'react-router-form';

import css from '../styles/Search.styl';

export default class Search extends React.Component {
  static get defaultProps() {
    return {
      placeholder: 'Enter Question'
    };
  }
  
  render() {
    return (
      <div className="search">
        <Link className="search__logo-link" to="/">
          <img className="search__logo" src="/imgs/logo.png" alt="Ask Trev Logo" />
        </Link>
        <div className="search__bar">
          <Form to="/page/results/_query_" method="POST">
            <input 
              type="text" 
              id="searchBox" 
              className="search__input"  
              name="query"
              autoComplete="off"
              placeholder={this.props.placeholder}
              defaultValue={ this.props.query || '' }
            />
            <button className="search__btn"></button>
          </Form>
        </div>
      </div>
    );
  }
}