import React from 'react';
import PropTypes from 'prop-types';
import { CardItem } from 'themes/components';

const DepositGeneralInformationTemplate = ({ item, t }) => {
	return (
		<div className="card card--primary card--med u-mar--bottom--med">
			<h3 className="col col-sml-12 u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>

			<div className="card--secondary card--med">
				<CardItem
					label={t('CONTRIBUTION.DETAILS.DONOR_NAME')}
					value={item && item.donor && item.donor.name}
				/>
				<CardItem
					label={t('CONTRIBUTION.DETAILS.PAYER_NAME')}
					value={item && (item.bankAccount && item.bankAccount.isThirdPartyAccount && item.bankAccount.accountHolder
						? item.bankAccount.accountHolder.name : item.thirdPartyDonorAdvisedFundId && item.thirdPartyDonorAdvisedFundId != ""
							? (this.thirdPartyFunds.find(c => c.id == item.thirdPartyDonorAdvisedFundId)).name : item.payerInformation.name)}
				/>
				<CardItem
					label={t('CONTRIBUTION.DETAILS.PAYER_NAME')}
					value={item && (item.donor ? item.donor.name : item.payerInformation.name)}
				/>
			</div>
		</div>
	);
};

export default DepositGeneralInformationTemplate;

DepositGeneralInformationTemplate.propTypes = {
	item: PropTypes.object,
	t: PropTypes.func,
};
