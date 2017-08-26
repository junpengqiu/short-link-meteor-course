import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor'
export default class Signup extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        error: ''
      };
  }

  renderError(){
    if(this.state.error){
      return(
        <p>
          {this.state.error}
        </p>
      )
    }
  }

  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length < 9){
      console.log("got it baby")
      return this.setState({error: "Password must be length of 9 or above"})

    }

    Accounts.createUser(
      {
        email: email,
        password: password
      }
      , (err) => {
          if(err) {
            this.setState({...this.state, error: err.reason})
          }else{
            this.setState({...this.state, error: ''})
          }
      }
    )
    Accounts.logout();
  }

  render(){
    return(
      <div>
        <h1> Join Now! </h1>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" name="email" ref="email" placeholder="Email" />
          <input type="password" name="password" ref="password" placeholder="Password" />
          {this.renderError()}
          <button>Create Account</button>
        </form>

        <Link to="/"> Already have an account? </Link>
      </div>
    );
  }
}
