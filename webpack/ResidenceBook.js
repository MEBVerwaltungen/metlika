import React, {Component} from 'react';
import ReservationService from './ReservationService';
import ResidenceService from './ResidenceService';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom'
import moment from 'moment';
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import Modal from 'react-modal';
import {translate, Trans} from 'react-i18next';

Modal.setAppElement('#root');

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class ResidenceBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateRanges: [],
            successModalIsOpen: false,
            errorModalIsOpen: false,
            validationModalIsOpen: false,
            validationErrorMessage: "",
            errorStatus: null,
            errorText: '',
            dates: null,
            checkInDateString: "",
            checkOutDateString: "",
            residence: {name: ""},
            reservation: {
                checkIn: "",
                checkOut: "",
                adults: 0,
                children: 0,
                firstName: '',
                lastName: '',
                address: '',
                zip: '',
                city: '',
                country: '',
                bankName: '',
                bankCode: '',
                bankAccount: '',
                phoneNumber: '',
                cellPhoneNumber: '',
                email: '',
                agreementAccepted: '',
                site: 'metlika',
                locale: this.props.locale,
                residenceId: this.props.match.params.residenceId,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.onDateSelect = this.onDateSelect.bind(this);
        this.getModalParent = this.getModalParent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showAgreementError = this.showAgreementError.bind(this);
        this.showBookingDurationError = this.showBookingDurationError.bind(this);
    }

    onDateSelect(dates) {
        var reservation = this.state.reservation;
        reservation.checkIn = dates.start;
        reservation.checkOut = dates.end;
        this.setState(
            {
                reservation: reservation,
                dates: dates,
                checkInDateString: reservation.checkIn.format('YYYY-MM-DD'),
                checkOutDateString: reservation.checkOut.format('YYYY-MM-DD')
            });
    }

    handleChange(event) {
        var reservation = this.state.reservation;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        reservation[event.target.name] = value;
        this.setState({reservation: reservation});
    }

    handleError(response) {
        this.setState({errorModalIsOpen: true, errorStatus: response.status});
        if(response.text){
            response.text().then(text => {
                this.setState({errorText: text});
            })
        } else if(response.message) {
            this.setState({errorText: response.message});
        } else {
            this.setState({errorText: "error: " + response});
        }
    }

    handleSuccess(response) {
        this.setState({successModalIsOpen: true});
    }

    showBookingDurationError() {
        this.setState({
            validationModalIsOpen: true,
            validationErrorMessage: this.props.t('booking_error_dates', {framework: 'react-i18next'})
        })
    }

    showAgreementError() {
        this.setState({
            validationModalIsOpen: true,
            validationErrorMessage: this.props.t('booking_error_terms', {framework: 'react-i18next'})
        })
    }

    handleSubmit(event) {
        if (this.state.reservation.agreementAccepted !== true) {
            this.showAgreementError();
        } else if (this.state.reservation.checkIn === '' || this.state.reservation.checkOut === '') {
            this.showBookingDurationError();
        } else {
            new ReservationService().createReservation(this.state.reservation, this.handleSuccess, this.handleError);
        }
        event.preventDefault();
    }

    componentDidMount() {
        let service = new ResidenceService(this.props.locale);
        let id = this.state.reservation.residenceId;
        service.getResidenceReservations(id).then(reservations => {
            var unavailable = reservations.map(function (reservation) {
                var r = reservation.attributes;
                return {state: 'unavailable', range: moment.range(moment(r.check_in), moment(r.check_out))};
            });
            this.setState({dateRanges: unavailable});
        });
        service.getResidence(id).then(residence => {
            this.setState({residence: residence});
        });
    }

    getModalParent() {
        return document.querySelector('#residence-book-form');
    }

    closeModal() {
        this.setState({successModalIsOpen: false, errorModalIsOpen: false, validationModalIsOpen: false});
    }

    render() {
        return (
            <div id="residence-book-form" className="col-12-xlarge">
                <h1>{this.state.residence.name}</h1>
                <form onSubmit={this.handleSubmit}>
                    <h2>Dates</h2>
                    <DateRangePicker
                        onSelect={this.onDateSelect}
                        value={this.state.dates}
                        firstOfWeek={1}
                        selectionType="range"
                        defaultState="available"
                        numberOfCalendars={2}
                        minimumDate={moment().toDate()}
                        stateDefinitions={
                            {
                                available: {
                                    color: null,
                                    label: 'Available',
                                },
                                enquire: {
                                    color: '#ffd200',
                                    label: 'Enquire',
                                },
                                unavailable: {
                                    selectable: false,
                                    color: '#78818b',
                                    label: 'Unavailable',
                                },
                            }
                        }
                        dateStates={this.state.dateRanges}
                    />
                    <p>{this.props.t('booking_calendar_hint', {framework: 'react-i18next'})}</p>
                    <div className="row gtr-uniform">
                        <div className="col-6 col-12-xsmall">
                            <input placeholder="Check-in" disabled="disabled" type="text" name="checkIn"
                                   value={this.state.checkInDateString}/>
                        </div>
                        <div className="col-6 col-12-xsmall">
                            <input placeholder="Check-out" disabled="disabled" type="text" name="checkOut"
                                   value={this.state.checkOutDateString}/>
                        </div>
                    </div>

                    <p/>
                    <h2>{this.props.t('booking_guests', {framework: 'react-i18next'})}</h2>

                    <div className="row gtr-uniform">
                        <div className="col-6 col-12-medium">
                            <label
                                htmlFor="adults">{this.props.t('booking_adults', {framework: 'react-i18next'})}:</label>
                            <select value={this.state.reservation.adults} id="adults" name="adults"
                                    onChange={this.handleChange} required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4">5</option>
                            </select>
                        </div>
                        <div className="col-6 col-12-medium">
                            <label
                                htmlFor="children">{this.props.t('booking_children', {framework: 'react-i18next'})}:</label>
                            <select value={this.state.reservation.children} id="children" name="children"
                                    onChange={this.handleChange} required>
                                <option value="1">0</option>
                                <option value="2">1</option>
                                <option value="3">2</option>
                                <option value="4">3</option>
                                <option value="4">4</option>
                                <option value="4">5</option>
                            </select>
                        </div>
                    </div>

                    <p/>
                    <h2>{this.props.t('booking_contact_details', {framework: 'react-i18next'})}</h2>

                    <div className="row gtr-uniform">

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_first_name', {framework: 'react-i18next'})}
                                   type="text" name="firstName" value={this.state.reservation.firstName}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_last_name', {framework: 'react-i18next'})}
                                   type="text" name="lastName" value={this.state.reservation.lastName}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_address', {framework: 'react-i18next'})}
                                   type="text" name="address" value={this.state.reservation.address}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_zip_code', {framework: 'react-i18next'})}
                                   type="text" name="zip" value={this.state.reservation.zip}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_city', {framework: 'react-i18next'})} type="text"
                                   name="city" value={this.state.reservation.city} onChange={this.handleChange}
                                   required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_country', {framework: 'react-i18next'})}
                                   type="text" name="country" value={this.state.reservation.country}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_cell_phone', {framework: 'react-i18next'})}
                                   type="text" name="cellPhoneNumber" value={this.state.reservation.cellPhoneNumber}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_phone', {framework: 'react-i18next'})} type="text"
                                   name="phoneNumber" value={this.state.reservation.phoneNumber}
                                   onChange={this.handleChange} required="required"/>
                        </div>

                        <div className="col-6 col-12-xsmall">
                            <input placeholder={this.props.t('booking_email', {framework: 'react-i18next'})} type="text"
                                   name="email" value={this.state.reservation.email} onChange={this.handleChange}
                                   required="required" pattern=".+[@].+[.].+"/>
                        </div>

                    </div>

                    <p/>
                    <h2>{this.props.t('booking_terms', {framework: 'react-i18next'})}</h2>

                    <div className="row gtr-uniform">

                        <div className="col-12">
                            <input type="checkbox" id="agreementAccepted" name="agreementAccepted"
                                   checked={this.state.reservation.agreementAccepted} onChange={this.handleChange}/>
                            <label htmlFor="agreementAccepted">
                                <Trans i18nKey="booking_terms_accepted">
                                    I agree to the <a target="_blank" href={this.props.general_terms_url}>general terms</a> and <a target="_blank" href={this.props.privacy_policy_url}>privacy policy</a>
                                </Trans>
                            </label>
                        </div>

                        <div className="col-12">
                            <input type="hidden" name="residenceId" value={this.state.reservation.residenceId}/>
                            <input type="hidden" name="site" value={this.state.reservation.site}/>
                            <input type="hidden" name="locale" value={this.state.reservation.locale}
                                   onChange={this.handleChange}/>
                            <input type="submit" value={this.props.t('booking_submit', {framework: 'react-i18next'})}
                                   className="button primary"/>
                        </div>

                    </div>

                </form>

                <Modal
                    isOpen={this.state.successModalIsOpen}
                    contentLabel="Success"
                    parentSelector={this.getModalParent}
                    style={customModalStyles}
                >
                    <p>
                        {this.props.t('booking_thank_you', {framework: 'react-i18next'})}
                    </p>
                    <button>
                        <Link to={`/residences/${this.state.reservation.residenceId}`}>Close</Link>
                    </button>
                </Modal>

                <Modal
                    isOpen={this.state.errorModalIsOpen}
                    contentLabel="Error"
                    parentSelector={this.getModalParent}
                    style={customModalStyles}
                >
                    <p>
                        {this.props.t('booking_error', {framework: 'react-i18next'})}
                    </p>
                    <button onClick={this.closeModal}>Close</button>
                    <p>Status: {this.state.errorStatus}</p>
                    <p>Text: {this.state.errorText}</p>
                </Modal>

                <Modal
                    isOpen={this.state.validationModalIsOpen}
                    contentLabel="Validation"
                    parentSelector={this.getModalParent}
                    style={customModalStyles}
                >
                    <p>
                        {this.state.validationErrorMessage}
                    </p>
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(translate('common')(ResidenceBook));