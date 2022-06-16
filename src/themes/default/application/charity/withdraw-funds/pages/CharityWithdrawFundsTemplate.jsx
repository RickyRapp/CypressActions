import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Content, Page } from 'core/layouts';

function CharityWithdrawFundsTemplate({ charityWithdrawFundsViewStore, t }) {
	const { 

     } = charityWithdrawFundsViewStore;

	return (
		<Page>
            <div>
                ok
            </div>
        </Page>
	);
}

CharityWithdrawFundsTemplate.propTypes = {
	charityWithdrawFundsViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(CharityWithdrawFundsTemplate);
