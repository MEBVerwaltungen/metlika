import React, { Component } from 'react';
import ResidenceListing from './ResidenceListing';
import ResidenceViewer from './ResidenceViewer';
import ResidenceBook from './ResidenceBook';
import { Switch, Route } from 'react-router-dom'

class MebBookComponent extends Component {
  render() {
    return (
      <div>
      	<Switch>
		      <Route exact path='/' component={()=><ResidenceListing locale="en"/>}/>
		      <Route exact path='/residences/:residenceId' component={()=><ResidenceViewer locale="en"/>}/>
          <Route exact path='/residences/:residenceId/book' component={()=><ResidenceBook locale="en"/>}/>
		    </Switch>
      </div>
    );
  }
}

export default MebBookComponent;
