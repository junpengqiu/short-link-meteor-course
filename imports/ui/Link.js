import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {Links} from '../api/links';
import LinksList from './LinksList';
import {Meteor} from 'meteor/meteor'

export default class Link extends React.Component {

  onLogout() {
    Accounts.logout();
  }

  onSubmit(e){
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if(url){
      Meteor.call('links.insert', url)
      this.refs.url.value = '';
      return;
    }
  }

  render(){
    return(
      <div>
        <h1 style={{fontsize:12}}>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}> Logout </button>
        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
