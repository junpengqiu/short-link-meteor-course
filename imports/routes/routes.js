import {Router, Route, browserHistory} from 'react-router';
import React from 'react';
import {Meteor} from 'meteor/meteor';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unauthPages = ['/','/signup'];
const authPages = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace("/links")
  }
}
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace("/")
  }
}

export const routes = (
  <div>
    <p>
      title goes here
    </p>
    <Router history={browserHistory}>
      <Route path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
      <Route path="*" component={NotFound} />
    </Router>
  </div>
)

export const onAuthChange = (someOneLogged) => {
  const path = browserHistory.getCurrentLocation().pathname;
  const inAuth = authPages.includes(path)
  const inUnAuth = unauthPages.includes(path)

  // console.log("someOneLogged",someOneLogged)
  // console.log("inAuth",inAuth)

  if(someOneLogged && inUnAuth){
    browserHistory.replace("/links")
  }

  if(!someOneLogged && inAuth){
    browserHistory.replace("/")
  }
}
