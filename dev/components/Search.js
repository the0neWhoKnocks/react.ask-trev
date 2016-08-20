import React from 'react';
import { Link } from 'react-router';

import css from '../styles/Search.styl';

export default class Search extends React.Component {
  static get defaultProps() {
    return {
      placeholder: 'Enter Question'
    };
  }
  
  handleQuerySubmit(ev){
    ev.preventDefault();
    
    const query = this.refs.queryInput.value;
    const action = ev.target.getAttribute('action');
    
    this.props.submitQuery(query);
    this.props.history.push(`${action}/${query}`);
  }
  
  componentDidMount(){
    this.refs.queryInput.focus(); 
  }
  
  render() {
    const {placeholder} = this.props;
    const query = this.props.query;
    
    return (
      <div className="search">
        <Link className="search__logo-link" to="/">
          <img className="search__logo" src="/imgs/logo.png" alt="Ask Trev Logo" />
        </Link>
        <div className="search__bar">
          <form 
            action="/results" 
            method="POST"
            onSubmit={this.handleQuerySubmit.bind(this)}
          >
            <input 
              type="text" 
              id="searchBox" 
              className="search__input"  
              name="query"
              autoComplete="off"
              placeholder={placeholder}
              defaultValue={query}
              ref="queryInput"
            />
            <button className="search__btn"></button>
          </form>
        </div>
      </div>
    );
  }
}