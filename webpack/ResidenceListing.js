import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ResidenceService from './ResidenceService';
import {translate, Trans} from 'react-i18next';
import Loader from 'react-loader-spinner'

class ResidenceListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            residences: [],
            residencesLoaded: false
        };
    }

    render() {
        if (!this.state.residencesLoaded) {
            return (
                <div className="row spinner">
                    <Loader
                        type="ThreeDots"
                        color="#003b46"
                        height="100"
                        width="100"
                    />
                </div>
            );
        } else {
            return (
                <div className="row">
                    {
                        this.state.residences.map(r =>
                            <div key={r.id} className="residence-card col-12">
                                <div className="residence-card-columns row gtr-uniform">
                                    <div className="residence-image">
                                        {r.images[0] &&
                                        <img alt="" src={`${__API__}/${r.images[0].thumbnail}`}/>
                                        }
                                    </div>
                                    <div className="residence-info">
                                        <h3>{r.name}</h3>
                                        <p>{r.description && r.description.title}</p>
                                        <p><strong>Price from:</strong> €XX/night</p>
                                        <Link className="button primary" to={`/residences/${r.id}`}>
                                            {this.props.t('residence_card_cta', {framework: 'react-i18next'})}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }

    componentDidMount() {
        new ResidenceService(this.props.locale).getResidences().then(residences => {
            this.setState({residences: residences, residencesLoaded: true});
        });
    }

}

export default translate('common')(ResidenceListing);