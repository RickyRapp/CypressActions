import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content, Page } from 'core/layouts';

function CharityWithdrawFundsTemplate({ charityWithdrawFundsViewStore, t }) {
	// const {} = charityWithdrawFundsViewStore;

	return (
		<Page>
            <div className="card--primary card--med withdraw__container">
                <p className="withdraw__title">Available Balance</p>
                <p className="withdraw__price">$50,000</p>
				<p className="type--lrg">How much would you like to withdraw?</p>
				<p className="type--sml type--color--opaque u-mar--bottom--sml">Minimum $500 investment required.</p>
            </div>
        </Page>
	);
}

CharityWithdrawFundsTemplate.propTypes = {
	charityWithdrawFundsViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityWithdrawFundsTemplate);
