import React from 'react';

import { userStatuses } from '../reducers.js';
import { emptyFn } from '../utils.js';
import { logUserIn, logUserOut, authState } from '../database.js';
import css from '../styles/Login.styl';
import Button from './Button.js';

export default class Login extends React.Component {
  constructor(props){
    super(props);

    this.logPrefix = '[ LOGIN ]';
    this.cssPrefix = 'login';
    this.cssModifiers = {
      IS_ERROR: 'is--error',
      IS_INITIALIZING: 'is--initializing'
    };
    this.state = {
      userStateChecked: false
    };
    this.removeAuthListener = emptyFn;
    this.mounted = false;
  }

  handleFormSubmit(ev){
    ev.preventDefault();

    this.props.loginPending();

    logUserIn(
      this.refs.emailInput.value,
      this.refs.passwordInput.value
    ).catch(function(err){
      this.props.loginFailure();
      this.props.setErrorMessage(`Login Failed [${err.code}] \n\n ${err.message}`);
    }.bind(this));

    return false;
  }
  
  handleInvalid(msg, ev){
    const input = ev.target;
    
    input.setCustomValidity(input.value !== '' ? '' : msg);
  }
  
  handleInput(ev){
    const input = ev.target;
    
    // reset error message so you don't get errors as you type.
    input.setCustomValidity('');
  }
  
  handleFocus(ev){
    const input = ev.target;
    
    if( this.props.userStatus === userStatuses.LOGIN_FAILURE ){
      this.props.loggedOut();
      this.props.setErrorMessage('');
    }
  }

  componentWillUnmount() {
    console.log(this.logPrefix, 'Unmounted');
    this.mounted = false;
    this.removeAuthListener();
  }

  componentDidMount(){
    this.removeAuthListener = authState(function(userData){
      if( userData ){        
        console.log(this.logPrefix, 'User data:', userData);
        userData.getToken().then(function(token){
          console.log(this.logPrefix, "== User token == \n", token);
        }.bind(this));
        this.props.loginSuccess();
      }else{
        console.log(this.logPrefix, 'User not logged in');
      }

      if(
        this.mounted
        && !this.state.userStateChecked
      ){
        this.setState({
          userStateChecked: true
        });
        this.refs.emailInput.focus();
      }
    }.bind(this));

    this.mounted = true;
  }
  
  render(){ 
    let rootProps = {
      className: this.cssPrefix
    };
    let msgProps = {
      className: `${this.cssPrefix}__msg`
    };
    let btnProps = {
      extraClasses: `${this.cssPrefix}__btn`,
      type: 'submit',
      children: 'Login'
    };

    if( !this.state.userStateChecked ){
      rootProps.className += ` ${this.cssModifiers.IS_INITIALIZING}`;
    }

    switch(this.props.userStatus){
      case userStatuses.LOGIN_FAILURE :
        msgProps.className += ` ${this.cssModifiers.IS_ERROR}`;
        msgProps.children = this.props.errorMessage;
        break;

      case userStatuses.LOGIN_PENDING :
        btnProps.disabled = 'disabled';
        btnProps.children = 'Pending';
        break;
    }
    
    return (
      <div {...rootProps}>
        <div className={`${this.cssPrefix}__overlay`} />
        <form
          method="POST"
          className={`${this.cssPrefix}__form`}
          onSubmit={this.handleFormSubmit.bind(this)}
        >
          <label>Email</label>
          <input 
            type="email" 
            name="username" 
            placeholder="name@example.com"
            ref="emailInput"
            required
            onFocus={this.handleFocus.bind(this)}
            onInput={this.handleInput.bind(this)}
            onInvalid={this.handleInvalid.bind(null, 'An email is required')}
          />
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            ref="passwordInput"
            required
            onFocus={this.handleFocus.bind(this)}
            onInput={this.handleInput.bind(this)}
            onInvalid={this.handleInvalid.bind(null, 'A password is required')}
          />
          <Button {...btnProps} />
          <div {...msgProps} />
        </form>
      </div>
    );
  }
}