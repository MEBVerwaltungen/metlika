import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResidenceService from './ResidenceService';

class ResidenceListing extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      residences: []
    };
  }

  render() {
    const list = this.state.residences.map(r =>
      <div key={r.id} class="residence-card">
        <div class="residence-card-columns">
          <div class="residence-image">
          { r.images[0] && 
            <img alt="" src={`http://localhost:4000/${r.images[0].url}`}/>
          }
          </div>
          <div class="residence-info">
            <h2>{r.name}</h2>
            <p>{r.description && r.description.text}</p>
            <p><Link to={`/residences/${r.id}`}>Show more and book</Link></p>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {list}
      </div>
    );
  }

  componentDidMount() {
    new ResidenceService(this.props.locale).getResidences().then(residences => {
      this.setState({residences: residences});
    });  
  }

}

export default ResidenceListing;