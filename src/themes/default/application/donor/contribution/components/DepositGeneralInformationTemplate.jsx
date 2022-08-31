import React from 'react';
import PropTypes from 'prop-types';
import { Date } from 'core/components';
import { CardItem } from 'themes/components';

const DepositGeneralInformationTemplate = ({ item, t }) => {
	return (
		<div className="card card--primary card--med u-mar--bottom--med">
			<h3 className="col col-sml-12 u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>

			<div className="card--secondary card--med">
				<CardItem
					t={t}
					label={'CONTRIBUTION.DETAILS.DONOR_NAME'}
					value={item && item.donor && item.donor.name}
				/> {console.log(item && item)}
                <CardItem
                    t={t}
                    label={'CONTRIBUTION.DETAILS.CONFRIMATION_NUMBER'}
                    value={item && item.confirmationNumber} />
				<CardItem
					t={t}
					label={'CONTRIBUTION.DETAILS.PAYER_NAME' }
					value={item && (item.bankAccount ? (item.bankAccount.isThirdPartyAccount ? item.bankAccount.accountHolder.name : item.donor.name ) : ( item.isThirdParty ? item.payerInformation.name : item.donor.name )) }
				/>
                <CardItem
                    t={t}
                    label={'CONTRIBUTION.DETAILS.STATUS'}
                    value={item && item.contributionStatus.name} />
			</div>
		</div>
	);
};

export default DepositGeneralInformationTemplate;

DepositGeneralInformationTemplate.propTypes = {
	item: PropTypes.object,
	t: PropTypes.func,
};
