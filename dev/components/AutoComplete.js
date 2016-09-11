import React from 'react';
import { dataFrom } from '../database.js';
import { debounce, objToArray } from '../utils.js';
import css from '../styles/AutoComplete.styl';
import Button from './Button.js';

export default class AutoComplete extends React.Component {
  constructor(props){
    super(props);

    this.logPrefix = '[ AutoComplete ] -';
    this.jsPrefixClass = 'js-';
    this.jsPrefix = `.${this.jsPrefixClass}`;
    this.namespace = 'autocomplete';
    this.fullList = [];
    this.listItemIndex = 0;
    this.events = {
      KEY_DOWN: 'keydown'
    };
    this.eventBindings = {
      INPUT_KEYDOWN: undefined
    };
    this.keys = {
      DOWN: 40,
      UP: 38
    };
    this.selectors = {
      LIST_ITEM_BTN: `${this.jsPrefix}${this.namespace}ListItemBtn`
    };
    this.state = {
      completionList: []
    };
  }

  static get defaultProps(){
    return {
      dataSource: undefined,
      defaultValue: undefined,
      extraClasses: undefined,
      inputName: `${this.namespace}_input`,
      placeholder: 'Enter Query'
    };
  }

  getAutoCompleteVals({title}){
    return title;
  }

  componentDidMount(){
    if( this.props.dataSource ){
      dataFrom(this.props.dataSource, function(data){
        this.fullList = objToArray(data).map(this.getAutoCompleteVals);
        console.log(this.logPrefix, 'Completion list loaded', this.fullList);

        // if there's a list open, update that list with the new vals
        if( this.state.completionList.length ) this.findMatches();
      }.bind(this));
    }
  }

  findMatches(){
    const query = this.refs.input.value;
    let matches = [];

    // filter by query
    for(let i=0; i<this.fullList.length; i++){
      const item = this.fullList[i];

      if(
        item.toLowerCase().indexOf(query.toLowerCase()) > -1 // text found
        && query.length > 3 // query is longer than 3 letters
      ){
        matches.push(item);
      }
    }

    if( matches.length ){
      console.log(this.logPrefix, 'Matches found', matches);
    }

    this.setState({
      completionList: matches
    });
  }

  handleInput(ev){
    debounce(function(){
      this.findMatches();
    }.bind(this));
  }

  handleItemSelection(ev){
    // set input value
    this.refs.input.value = ev.target.innerText;
    this.listItemIndex = 0;
    // re-focus the input
    this.refs.input.focus();
    // hide the completion list
    this.setState({
      completionList: []
    });
  }

  handleMenuSelectionFromInput(ev){
    if(
      ev.keyCode != this.keys.DOWN
      || !this.state.completionList.length
    ) return;

    ev.preventDefault();

    // select the first item in the list
    this.refs.list.children[this.listItemIndex].querySelector(this.selectors.LIST_ITEM_BTN).focus();
  }

  handleArrowKeysInList(ev){
    if(
      ev.keyCode != this.keys.DOWN
      && ev.keyCode != this.keys.UP
    ) return;

    ev.preventDefault();

    var listItems = this.refs.list.children;

    switch(ev.keyCode){
      case this.keys.DOWN :
        this.listItemIndex++;
        break;

      case this.keys.UP :
        this.listItemIndex--;
        break;
    }

    if(
      this.listItemIndex == listItems.length
      || this.listItemIndex < 0
    ){
      this.listItemIndex = 0;
      this.refs.input.focus();
      return;
    }

    listItems[this.listItemIndex].querySelector(this.selectors.LIST_ITEM_BTN).focus();
  }

  handleFocus(ev){
    // since handlers are bound, they create an anonymous function which can't be removed since the comparison won't be equal.
    this.eventBindings.INPUT_KEYDOWN = this.handleMenuSelectionFromInput.bind(this);

    console.log(this.logPrefix, 'Start listening for user input');
    ev.target.addEventListener(this.events.KEY_DOWN, this.eventBindings.INPUT_KEYDOWN);
  }

  handleBlur(ev){
    console.log(this.logPrefix, 'Stop listening for user input');
    ev.target.removeEventListener(this.events.KEY_DOWN, this.eventBindings.INPUT_KEYDOWN);
  }

  buildCompletionItems(item, ndx){
    return (
      <li key={ndx} className={`${this.namespace}__list-item`}>
        <Button
          children={item}
          className={`${this.namespace}__list-item-btn ${this.jsPrefixClass}${this.namespace}ListItemBtn`}
          onClick={this.handleItemSelection.bind(this)}
          onKeyDown={this.handleArrowKeysInList.bind(this)}
        />
      </li>
    );
  }

  render(){
    const {placeholder} = this.props;
    const list = ( this.state.completionList.length )
      ? this.state.completionList.map(this.buildCompletionItems, this)
      : null;
    let containerProps = {
      className: `${this.namespace}__container`
    };
    let listProps = {
      className: `${this.namespace}__list`,
      children: list,
      ref: 'list'
    };

    if( this.props.extraClasses ){
      containerProps.className += ` ${this.props.extraClasses}`;
    }

    if( list ){
      listProps.className += ' has--items';
    }

    return (
      <div {...containerProps}>
        <input
          className={`${this.namespace}__input`}
          type="text"
          ref="input"
          autoComplete="off"
          placeholder={placeholder}
          name={this.props.inputName}
          defaultValue={this.props.defaultValue}
          onInput={this.handleInput.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
        <ul {...listProps} />
      </div>
    );
  }
}