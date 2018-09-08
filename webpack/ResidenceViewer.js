import React, {Component} from 'react';
import ResidenceService from './ResidenceService'
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom'

class ResidenceViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            galleryIsOpen: false,
            residence: {description: {text: ''}}
        };
        this.closeGallery = this.closeGallery.bind(this);
    }

    closeGallery(){

    }

    render() {
        let images = [];
        if (this.state.residence.images) {
            images = this.state.residence.images.map(i => (
                {
                    src: __API__ + i.url,
                    thumbnail: __API__ + i.thumbnail,
                    srcSet: []
                }));
        }
        return (
            <div>
                <h1>{this.state.residence.name}</h1>
                <p>{this.state.residence.description.text}</p>
                <div>
                </div>
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