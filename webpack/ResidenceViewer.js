import React, {Component} from 'react';
import ResidenceService from './ResidenceService'
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom'
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';
import { translate, Trans } from 'react-i18next';

class ResidenceViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            galleryIsOpen: false,
            residence: {description: {text: ''}}
        };
    }

    render() {
        let images = [];
        if (this.state.residence.images) {
            images = this.state.residence.images.map(i => (
                {
                    src: __API__ + i.url,
                    thumbnail: __API__ + i.thumbnail,
                    title: this.state.residence.name
                }));
        }
        return (
            <div>
                <h1>{this.state.residence.name}</h1>
                <p>{this.state.residence.description.text}</p>
                <div>
                    <Lightbox
                        images={images}
                        renderImageFunc={(idx, image, toggleLightbox, width, height) => {
                            return (
                                <img
                                    key={idx}
                                    className="lightbox-img-thumbnail"
                                    src={image.thumbnail}
                                    onClick={toggleLightbox.bind(null, idx)} />
                            )
                        }}
                    />
                </div>
                <p>
                    <Link to={`/residences/${this.state.residence.id}/book`}>
                        { this.props.t('residence_page_cta', { framework: 'react-i18next' }) }
                    </Link>
                </p>
            </div>
        );
    }

    componentDidMount() {
        new ResidenceService(this.props.locale).getResidence(this.props.match.params.residenceId).then(residence => {
            this.setState({residence: residence});
        });
    }

}

export default withRouter(translate('common')(ResidenceViewer));