import React from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {routes, onAuthChange} from './../imports/routes/routes.js';

import {Links} from './../imports/api/links';

Tracker.autorun(() => {
  const someOneLogged = !!Meteor.userId();
  onAuthChange(someOneLogged);

})

Meteor.startup(()=>{
  ReactDOM.render(routes, document.getElementById('app'));
})
