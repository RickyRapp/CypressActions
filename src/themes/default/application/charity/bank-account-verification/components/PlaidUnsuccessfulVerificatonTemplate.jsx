import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const PlaidUnsuccessfulVerificatonTemplate = function ({ plaidUnsuccessfulVerificatonViewStore }) {
    const {
        redirectToPlaid,
        redirectToManual
    }= plaidUnsuccessfulVerificatonViewStore;

	return (
		<React.Fragment>
			<div className="card--primary card--plaid">
                <div className="card--plaid__container">
                    <i class="u-icon u-icon--verification u-icon--verification-error"></i>

                    <h2 className="card--plaid__title u-mar--bottom--med">Oops. It seems like that wasn't a match.</h2>

                    <button className="btn btn--med btn--secondary u-mar--bottom--sml" type="button" onClick={redirectToPlaid}>Try A Different Bank Account</button>
                    <p className="card--plaid__text u-mar--bottom--sml">- OR -</p>
                    <button className="btn btn--med btn--secondary" type="button" onClick={redirectToManual}>Verify Manually</button>
                </div>
            </div>
		</React.Fragment>
	);
};

PlaidUnsuccessfulVerificatonTemplate.propTypes = {
	t: PropTypes.func,
	plaidUnsuccessfulVerificatonViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(PlaidUnsuccessfulVerificatonTemplate);
