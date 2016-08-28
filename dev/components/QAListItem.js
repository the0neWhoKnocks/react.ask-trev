import React from 'react';
import { Link } from 'react-router';
import { emptyFn, generateHash } from '../utils.js';

import css from '../styles/QAListItem.styl';
import Button from './Button.js';

export default class QAListItem extends React.Component {
  constructor(props){
    super();
    
    this.state = {
      readOnly: (props.isNew) ? false : true,
      date: props.date,
      id: props.id,
      itemHasError: false,
      title: props.title,
      titleHasError: false,
      savedTitle: props.title,
      body: props.body,
      savedBody: props.body,
      errorMsg: ''
    };
    this.cssModifiers = {
      IS_READONLY: 'is--readonly',
      IS_INVALID: 'qa-list-item--is--invalid',
      HAS_ERROR: 'has--error'
    };
  }
  
  static get propTypes() {
    return {
      isNew: React.PropTypes.bool
    };
  }
  
  static get defaultProps() {
    return {
      isNew: false
    };
  }
  
  addErrorState(elName, msg){
    const _self = this;
    let obj = {};
    obj[elName +'HasError'] = true;
    if( msg ) obj.errorMsg = msg;
    
    this.setState(obj);
    setTimeout(function(){
      obj[elName +'HasError'] = false;
      _self.setState(obj);
    }, 500);
  }
  
  handleTitleChange(ev){
    let state = {
      title: ev.currentTarget.value
    };
    
    if( this.state.errorMsg !== '' ) state.errorMsg = '';
    
    this.setState(state);
  }
  
  handleBodyChange(ev){
    this.setState({
      body: ev.currentTarget.value
    });
  }
  
  handleStateChangeOnEdit(){
    this.refs.titleInput.focus();
  }
  
  handleItemEdit(ev){
    ev.currentTarget.blur();
    
    this.setState({
      readOnly: false
    }, this.handleStateChangeOnEdit.bind(this));
  }
  
  handleItemDelete(ev){
    ev.currentTarget.blur();
    
    console.log('[ DELETE ]', `"${this.state.id}" - "${this.state.savedTitle}"`);
    this.props.itemDelete(this.state.id);
  }
  
  handleItemSave(ev){
    const title = this.refs.titleInput.value;
    const body = this.refs.bodyInput.value;
    const hash = generateHash(title);
    const state = {
      readOnly: true,
      savedTitle: title,
      savedBody: this.refs.bodyInput.value,
      date: ''+ Date.now(),
      id: hash
    };
    
    ev.currentTarget.blur();
    
    // check that the user didn't set a title that already exists
    if( 
      title !== this.state.savedTitle
      && this.props.ids.indexOf(''+hash) > -1
    ){
      this.addErrorState('item', "There's already an item with this title.");
      return;
    }
    
    // only save the data if it's changed
    if(
      title !== this.state.savedTitle
      || body !== this.state.savedBody
    ){
      const itemData = {
        date: state.date,
        id: hash,
        title: title,
        body: body
      };
      state.savedTitle = title;
      state.savedBody = body;
      
      if( this.props.isNew ){        
        console.log('[ SAVE ]', itemData);
        this.props.itemSave(itemData);
      }else{
        console.log('[ UPDATE ]', itemData);
        this.props.itemUpdate(itemData, this.state.id);
      }
    }
    
    this.setState(state);
  }
  
  handleItemCancel(ev){
    ev.currentTarget.blur();
    
    if( this.props.isNew ){
      this.props.itemCancelCreate();
    }
    
    this.setState({
      readOnly: true,
      title: this.state.savedTitle,
      body: this.state.savedBody,
      errorMsg: ''
    });
  }
  
  handleInputKeys(ev){
    switch(ev.key){
      case 'Enter' :
        if( ev.currentTarget == this.refs.titleInput ){
          ev.preventDefault();
          
          this.addErrorState('title', '<ENTER> not allowed');
        }
        break;
    }
  }
  
  componentDidMount(){
    if( this.props.isNew ){
      this.refs.titleInput.focus();
    }      
  }
  
  render(){
    const readOnly = ( this.state.readOnly ) ? this.cssModifiers.IS_READONLY : '';
    const titleError = ( this.state.titleHasError ) ? this.cssModifiers.IS_INVALID : '';
    const itemError = ( this.state.itemHasError ) ? this.cssModifiers.IS_INVALID : '';
    const itemClass = `qa-list-item ${itemError}`;
    const errorClass = ( this.state.errorMsg !== '' ) ? this.cssModifiers.HAS_ERROR : '';
    let titleInputProps = {
      className: `qa-list-item__title ${readOnly} ${titleError}`,
      ref: 'titleInput'
    };
    let bodyInputProps = {
      className: `qa-list-item__body ${readOnly}`,
      ref: 'bodyInput'
    };
    let btn1Props = {};
    let btn2Props = {};
    let disabled = '';
    
    if( this.state.readOnly ){
      titleInputProps.value = this.state.title;
      titleInputProps.onChange = emptyFn;
      titleInputProps.disabled = 'disabled';
      bodyInputProps.value = this.state.body;
      bodyInputProps.onChange = emptyFn;
      bodyInputProps.disabled = 'disabled';
      btn1Props.handler = this.handleItemEdit.bind(this);
      btn1Props.label = 'Edit';
      btn2Props.handler = this.handleItemDelete.bind(this);
      btn2Props.label = 'Delete';
    }else{
      titleInputProps.value = this.state.title;
      titleInputProps.onChange = this.handleTitleChange.bind(this);
      titleInputProps.onKeyPress = this.handleInputKeys.bind(this);
      titleInputProps.disabled = '';
      bodyInputProps.value = this.state.body;
      bodyInputProps.onChange = this.handleBodyChange.bind(this);
      bodyInputProps.onKeyPress = this.handleInputKeys.bind(this);
      bodyInputProps.disabled = '';
      btn1Props.handler = this.handleItemSave.bind(this);
      btn1Props.label = 'Save';
      btn2Props.handler = this.handleItemCancel.bind(this);
      btn2Props.label = 'Cancel';
    }
    
    return (
      <li className={itemClass}>
        <div className="qa-list-item__container">
          <textarea ref="titleInput" placeholder="Title" {...titleInputProps} />
          <textarea placeholder="Body text" {...bodyInputProps} />
          <div className={`qa-list-item__error ${errorClass}`}>{this.state.errorMsg}</div>
        </div>
        <nav className="qa-list-item__nav">
          <Button 
            className="qa-list-item__nav-btn"
            onClick={btn1Props.handler}
          >{btn1Props.label}</Button>
          <Button
            className="qa-list-item__nav-btn"
            onClick={btn2Props.handler}
          >{btn2Props.label}</Button>
        </nav>
      </li>
    );
  }
}