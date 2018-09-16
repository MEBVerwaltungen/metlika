import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ResidenceService from './ResidenceService';
import { translate, Trans } from 'react-i18next';

class ResidenceListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            residences: []
        };
    }

    render() {
        return (
            <div>
                {
                    this.state.residences.map(r =>
                        <div key={r.id} className="residence-card">
                            <div className="residence-card-columns">
                                <div className="residence-image">
                                    {r.images[0] &&
                                    <img alt="" src={`${__API__}/${r.images[0].thumbnail}`}/>
                                    }
                                </div>
                                <div className="residence-info">
                                    <h2>{r.name}</h2>
                                    <p>{r.description && r.description.text}</p>
                                    <p>
                                        <Link to={`/residences/${r.id}`}>
                                            { this.props.t('residence_card_cta', { framework: 'react-i18next' }) }
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    componentDidMount() {
        new ResidenceService(this.props.locale).getResidences().then(residences => {
            this.setState({residences: residences});
        });
    }

}

export default translate('common')(ResidenceListing);