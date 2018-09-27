import React, {Component} from 'react';
import ResidenceService from './ResidenceService'
import ResidencePrices from './ResidencePrices'
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom'
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';
import Remarkable from 'remarkable';
import { translate, Trans } from 'react-i18next';
import Loader from "react-loader-spinner";

class ResidenceViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            galleryIsOpen: false,
            residence: {description: {text: ''}},
            residenceLoaded: false
        };
    }

    render() {
        let images = [];
        let html_description;
        if(!this.state.residenceLoaded) {
            return(
                <div className="row spinner">
                    <Loader
                        type="ThreeDots"
                        color="#003b46"
                        height="100"
                        width="100"
                    />
                </div>
            );
        }
        if (this.state.residence.images) {
            images = this.state.residence.images.map(i => (
                {
                    src: __API__ + i.url,
                    thumbnail: __API__ + i.thumbnail,
                    title: this.state.residence.name
                }));
        }
        if(this.state.residence){
            html_description = new Remarkable().render(this.state.residence.description.text);
        }
        return (
            <div>
                <h1>{this.state.residence.name}</h1>
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
                <div dangerouslySetInnerHTML={{__html: html_description}} />
                <h2>{ this.props.t('price_calendar', { framework: 'react-i18next' }) }</h2>
                <ResidencePrices prices={this.state.residence.prices}/>
                <p>
                    <Link className="button primary" to={`/residences/${this.state.residence.id}/book`}>
                        { this.props.t('residence_page_cta', { framework: 'react-i18next' }) }
                    </Link>
                </p>
            </div>
        );
    }

    componentDidMount() {
        new ResidenceService(this.props.locale).getResidence(this.props.match.params.residenceId).then(residence => {
            this.setState({residence: residence, residenceLoaded: true});
        });
    }

}

export default withRouter(translate('common')(ResidenceViewer));