import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        error: ''
      };
  }

  renderError(){
    if(this.state.error)return (
      <p>
        {this.state.error}
      </p>
    )
  }

  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    

    Meteor.loginWithPassword({email},password, err => {
      if(err){
        this.setState({...this.state, error: err.reason})
      }else{
        this.setState({...this.state, error: ''})
      }
    })

  }
  render(){
    return(
      <div>
        <h1> {"Log in from here"} </h1>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" name="email" ref="email" placeholder="Email" />
          <input type="password" name="password" ref="password" placeholder="Password" />
          {this.renderError()}
          <button>Log in</button>
        </form>


        <Link to="/signup">Need an account?</Link>
      </div>
    );
  }
}
