import React from 'react';
import ReactDOM from 'react-dom';
import MebBookComponent from './MebBookComponent';
import {HashRouter} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

const script = document.getElementById('bundle');
const locale = script.getAttribute('locale');
const privacy_policy_url = script.getAttribute('privacy_policy_url');
const general_terms_url = script.getAttribute('general_terms_url');

i18next.init({
    interpolation: {escapeValue: false},
    lng: locale,
    namespace: '',
    resources: {
        en: {
            common: {
                residence_card_cta: 'View Deal',
                residence_page_cta: 'Reservation inquiry',
                price_calendar: 'Price Calendar',
                from_to: 'From/To',
                price: 'Price',
                booking_calendar_hint: 'Use the calendar above to select the check-in and check-out dates.',
                booking_guests: 'Guests',
                booking_adults: 'Adults',
                booking_children: 'Children',
                booking_contact_details: 'Contact Details',
                booking_first_name: 'First Name',
                booking_last_name: 'Last Name',
                booking_address: 'Address',
                booking_zip_code: 'Zip Code',
                booking_city: 'City',
                booking_country: 'Country',
                booking_cell_phone: 'Cell Phone',
                booking_phone: 'Phone',
                booking_email: 'E-mail',
                booking_terms: 'Legal terms & Data privacy',
                booking_submit: 'Submit',
                booking_thank_you: 'Thank you! Your inquiry has been saved and you will hear from us soon.',
                booking_error: 'Oops, something went wrong! Please try again. If this continues please submit and email to support@support.com and include the error shown below.',
                booking_error_dates: 'Please select check-in and check-out dates using the calendar',
                booking_error_terms: 'Please read and accept the booking agreement and privacy policy before submitting the inquiry.',
                booking_terms_accepted: 'I agree to the <1>general terms</1> and <3>privacy policy</3>'
            },
        },
        de: {
            common: {
                residence_card_cta: 'Zum Angebot',
                residence_page_cta: 'Buchungsanfrage',
                price_calendar: 'Preiskalender',
                from_to: 'Von/Bis',
                price: 'Preis',
                booking_calendar_hint: 'Benutzen Sie den Kalender oben um Anreise- und Abreisetag zu wählen.',
                booking_guests: 'Gäste',
                booking_adults: 'Erwachsene',
                booking_children: 'Kinder',
                booking_contact_details: 'Kontaktadten',
                booking_first_name: 'Vorname',
                booking_last_name: 'Nachname',
                booking_address: 'Adresse',
                booking_zip_code: 'PLZ',
                booking_city: 'Stadt',
                booking_country: 'Land',
                booking_cell_phone: 'Handy',
                booking_phone: 'Telefon',
                booking_email: 'E-Mail',
                booking_terms: 'AGB & DSE',
                booking_submit: 'Abschicken',
                booking_thank_you: 'Danke schön! Ihre Anfrage wurde gespeichert, wir melden uns bald.',
                booking_error: 'Ojemine, etwas ist schief gelaufen. Bitte versuchen Sie es ernäut. Wenn es nicht besser wird, bitte ein E-Mail an support@support.com schicken.',
                booking_error_dates: 'Sie haben Anreise- und Abreisetag nicht ausgewählt.',
                booking_error_terms: 'Bitte bestätigen Sie, dass Sie die AGB und Datenschutzerklärung gelesen und akzeptiert haben.',
                booking_terms_accepted: 'Ich akzeptiere die <1>AGB</1> und die <3>Datenschutzerklärung</3>'
            },
        }
    }
});

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <HashRouter>
            <MebBookComponent locale={locale}
                              general_terms_url={general_terms_url}
                              privacy_policy_url={privacy_policy_url}/>
        </HashRouter>
    </I18nextProvider>,
    document.getElementById('root'));
