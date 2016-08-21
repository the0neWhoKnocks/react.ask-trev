import React from 'react';
import { Link } from 'react-router';
import { emptyFn, generateHash } from '../utils.js';

import css from '../styles/QAListItem.styl';

export default class QAListItem extends React.Component {
  constructor(props){
    super();
    
    this.state = {
      readOnly: true,
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
  
  handleItemEdit(ev){
    ev.currentTarget.blur();
    
    this.setState({
      readOnly: false
    });
  }
  
  handleItemDelete(ev){
    ev.currentTarget.blur();
    alert('delete item');
  }
  
  handleItemSave(ev){
    const title = this.refs.titleInput.value;
    const body = this.refs.bodyInput.value;
    const hash = generateHash(title);
    const state = {
      readOnly: true,
      savedTitle: title,
      savedBody: this.refs.bodyInput.value
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
      const data = {
        id: hash,
        title: title,
        body: body
      };
      state.savedTitle = title;
      state.savedBody = body;
      
      console.log('[ SAVE ]', data);
      // TODO - replace old id with new hash in props.ids
      // TODO - trigger action to update item
      // TODO - make new endpoint to handle updating individual items
      alert('save item');
    }
    
    this.setState(state);
  }
  
  handleItemCancel(ev){
    ev.currentTarget.blur();
    
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
    
    if( this.state.readOnly ){
      titleInputProps.value = this.state.title;
      titleInputProps.onChange = emptyFn;
      bodyInputProps.value = this.state.body;
      bodyInputProps.onChange = emptyFn;
      btn1Props.handler = this.handleItemEdit.bind(this);
      btn1Props.label = 'Edit';
      btn2Props.handler = this.handleItemDelete.bind(this);
      btn2Props.label = 'Delete';
    }else{
      titleInputProps.value = this.state.title;
      titleInputProps.onChange = this.handleTitleChange.bind(this);
      titleInputProps.onKeyPress = this.handleInputKeys.bind(this);
      bodyInputProps.value = this.state.body;
      bodyInputProps.onChange = this.handleBodyChange.bind(this);
      bodyInputProps.onKeyPress = this.handleInputKeys.bind(this);
      btn1Props.handler = this.handleItemSave.bind(this);
      btn1Props.label = 'Save';
      btn2Props.handler = this.handleItemCancel.bind(this);
      btn2Props.label = 'Cancel';
    }
    
    return (
      <li className={itemClass}>
        <div className="qa-list-item__container">
          <textarea {...titleInputProps} />
          <textarea {...bodyInputProps} />
          <div className={`qa-list-item__error ${errorClass}`}>{this.state.errorMsg}</div>
        </div>
        <nav className="qa-list-item__nav">
          <button 
            type="button" 
            className="qa-list-item__nav-btn"
            onClick={btn1Props.handler}
          >{btn1Props.label}</button>
          <button 
            type="button" 
            className="qa-list-item__nav-btn"
            onClick={btn2Props.handler}
          >{btn2Props.label}</button>
        </nav>
      </li>
    );
  }
}