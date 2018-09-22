import React, { Component } from 'react';
import ResidenceListing from './ResidenceListing';
import ResidenceViewer from './ResidenceViewer';
import ResidenceBook from './ResidenceBook';
import { Switch, Route } from 'react-router-dom'

class MebBookComponent extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={()=><ResidenceListing locale="en"/>}/>
        <Route exact path='/residences/:residenceId' component={()=><ResidenceViewer locale="en"/>}/>
        <Route exact path='/residences/:residenceId/book' component={()=>
        <ResidenceBook privacy_policy_url={this.props.privacy_policy_url} general_terms_url={this.props.general_terms_url} locale="en"/>}/>
      </Switch>
    );
  }
}

export default MebBookComponent;
