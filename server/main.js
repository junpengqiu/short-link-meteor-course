import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import {Links} from '../imports/api/links'

import '../imports/api/users';
import '../imports/api/links';

Meteor.startup(() => {
  // code to run on server at startup


  WebApp.connectHandlers.use((req,res,next) => {
    const _id = req.url.slice(1); //e.g. localhost:3000/123 => /123 =slice=> 123
    const link = Links.findOne({_id}) //links of every user are stored in the same DB

    if(link){
      res.statusCode = 302 //not in current dir
      res.setHeader('Location',link.url)
      //e.g. link._id = 123, found in Links DB.
      res.end();
    }

    next();
  })

});
