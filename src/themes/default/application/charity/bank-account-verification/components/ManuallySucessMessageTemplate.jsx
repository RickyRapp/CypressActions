import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const ManuallySucessMessageTemplate = function () {

	return (
		<React.Fragment>
			<div className="card--primary card--plaid">
                <div className="card--plaid__container">
                    <i class="u-icon u-icon--verification u-icon--verification-received"></i>

                    <h2 className="card--plaid__title u-mar--bottom--med">Thanks! Your documents have been received.</h2>
                    <p className="card--plaid__text">You'll be notified once they have been approved.</p>
                </div>
            </div>
		</React.Fragment>
	);
};

ManuallySucessMessageTemplate.propTypes = {
	t: PropTypes.func,
	manuallySucessMessageViewStore : PropTypes.object.isRequired
};

export default defaultTemplate(ManuallySucessMessageTemplate);
