import React, {Component} from 'react';
import {translate, Trans} from 'react-i18next';

class ResidencePrices extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let price_lines;

        if(this.props.prices){
            price_lines = this.props.prices.map(price =>
                <tr key={price.id}>
                    <td>{price.start_day}.{price.start_month}-{price.end_day}.{price.end_month}</td>
                    <td>€{price.price}</td>
                </tr>
            )
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>{ this.props.t('from_to', { framework: 'react-i18next' }) }</th>
                        <th>{ this.props.t('price', { framework: 'react-i18next' }) }</th>
                    </tr>
                </tbody>
                {price_lines}
            </table>
        );
    }

}

export default translate('common')(ResidencePrices);