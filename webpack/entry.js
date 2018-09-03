import React from 'react';
import ReactDOM from 'react-dom';
import MebBookComponent from './MebBookComponent';
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
	<HashRouter>
		<MebBookComponent />
	</HashRouter>,
	document.getElementById('root'));
