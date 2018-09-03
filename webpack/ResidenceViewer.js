import React, { Component } from 'react';
import ResidenceService from './ResidenceService'
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom'

class ResidenceViewer extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      residence: {description: {text: ''}}
    };
  }

  render() {
    return (
      <div>
        <h1>{ this.state.residence.name }</h1>
        <p>{ this.state.residence.description.text }</p>
        <p><Link to={`/residences/${this.state.residence.id}/book`}>Book now</Link></p>
      </div>
    );
  }

  componentDidMount() {
    new ResidenceService(this.props.locale).getResidence(this.props.match.params.residenceId).then(residence => {
      this.setState({residence: residence});
    });
  }

}

export default withRouter(ResidenceViewer);