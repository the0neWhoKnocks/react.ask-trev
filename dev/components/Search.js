import React from 'react';
import { Link } from 'react-router';
import css from '../styles/Search.styl';
import AutoComplete from './AutoComplete.js';

export default class Search extends React.Component {
  static get defaultProps() {
    return {
      placeholder: 'Enter Question'
    };
  }
  
  handleQuerySubmit(ev){
    ev.preventDefault();
    
    const query = this.refs.autoComplete.refs.input.value;
    const action = ev.target.getAttribute('action');
    
    this.props.submitQuery(query);
    this.props.history.push(`${action}/${query}`);
  }

  componentDidMount(){
    this.refs.autoComplete.refs.input.focus();
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
            <AutoComplete
              {...this.props}
              ref="autoComplete"
              dataSource="results"
              inputName="query"
              placeholder={placeholder}
              defaultValue={query}
              extraClasses="is--search-container"
            />
            <button className="search__btn"></button>
          </form>
        </div>
      </div>
    );
  }
}