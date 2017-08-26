import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker'
import {Links} from '../api/links'
import {Meteor} from 'meteor/meteor'

export default class  LinksList extends Component {

  constructor(props){
    super(props)
    this.state = {
      linkSet : []
    }
  }

  componentDidMount(){
    this.linkSetTracker = Tracker.autorun(
      () => {
        Meteor.subscribe('links');
        const retrivedLinks =Links.find({}).fetch();
        this.setState(
          {
            ...this.state,
            linkSet: retrivedLinks.map((x) => x)
          }
        )

      }
    )
  }



  componentWillUnmount(){
    this.linkSetTracker.stop()
    this.setState(
      {
        ...this.state,
        linkSet : []
      }
    )
  }

  renderLinkSet(){
    return(this.state.linkSet.map(
      (x) => <p key={x._id}>{x.url}</p>
    ))
  }

  render(){

    return(
      <div>
        <p>
          Link List
        </p>
        {this.renderLinkSet()}
      </div>
    )
  }
}
