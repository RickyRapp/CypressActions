import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const PlaidSuccessfulVerificatonTemplate = function ({plaidSuccessfulVerificatonViewStore}) {
    const {
        redirectToDashboard,
        bankAccountNumber,
        redirectToSettings
    } = plaidSuccessfulVerificatonViewStore

	return (
		<React.Fragment>
			<div className="card--primary card--plaid">
                <div className="card--plaid__container">
                    <i class="u-icon u-icon--verification u-icon--verification-match"></i>

                    <h2 className="card--plaid__title">Congrats! It was a perfect match.</h2>
                    <p className="card--plaid__subtitle">Your account has now been verified!</p>
                    <p className="card--plaid__text">Note, we have enrolled your organization for electronic payments with the selected bank account ending in <strong>{bankAccountNumber}</strong>.
                     If you wish to update your settings, please <a href="#" onClick={redirectToSettings}>click here</a>.</p>

                    <button className="btn btn--med btn--secondary" type="button" onClick={redirectToDashboard}>Go To Dashboard</button>
                </div>
            </div>
		</React.Fragment>
	);
};

PlaidSuccessfulVerificatonTemplate.propTypes = {
	t: PropTypes.func,
	plaidSuccessfulVerificatonViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(PlaidSuccessfulVerificatonTemplate);
