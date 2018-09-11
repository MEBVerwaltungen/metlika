import React from 'react';
import ReactDOM from 'react-dom';
import MebBookComponent from './MebBookComponent';
import { HashRouter } from 'react-router-dom'

const script = document.getElementById('bundle');
const locale = script.getAttribute('locale');
const privacy_policy_url = script.getAttribute('privacy_policy_url');
const general_terms_url = script.getAttribute('general_terms_url');

ReactDOM.render(
	<HashRouter>
		<MebBookComponent locale={locale}
						  general_terms_url={general_terms_url}
						  privacy_policy_url={privacy_policy_url}/>
	</HashRouter>,
	document.getElementById('root'));
