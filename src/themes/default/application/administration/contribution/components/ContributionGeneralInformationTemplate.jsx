import React from 'react';
import PropTypes from 'prop-types';
import { Date } from 'core/components';
import { CardItem } from 'themes/components';

const ContributionGeneralInformationTemplate = ({ item, t }) => {
	return (
		<div className="card--primary card--med u-mar--bottom--med">
			<h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.GENERAL_INFORMATION')}</h3>

			<div className="card--secondary card--tny">
				{item && item.donor ? (
					<CardItem label={t('CONTRIBUTION.DETAILS.DONOR_NAME')} value={item.donor && item.donor.name} />
				) : (
					<CardItem label={t('CONTRIBUTION.DETAILS.PAYER_NAME')} value={item.payerInformation && item.payerInformation.name} />
				)}

				<CardItem label={t('CONTRIBUTION.DETAILS.CONFRIMATION_NUMBER')} value={item && item.confirmationNumber} />
				<CardItem label={t('CONTRIBUTION.DETAILS.STATUS')} value={item && item.contributionStatus.name} />

				{item && item.donor == null && (
					<React.Fragment>
						<CardItem label={t('CONTRIBUTION.DETAILS.ADDRESS_LINE_1')} value={item.payerInformation && item.payerInformation.addressLine1} />
						<CardItem label={t('CONTRIBUTION.DETAILS.ADDRESS_LINE_2')} value={item.payerInformation && item.payerInformation.addressLine2} />
						<CardItem label={t('CONTRIBUTION.DETAILS.CITY')} value={item.payerInformation && item.payerInformation.city} />
						<CardItem label={t('CONTRIBUTION.DETAILS.NUMBER')} value={item.payerInformation && item.payerInformation.number} />
						<CardItem label={t('CONTRIBUTION.DETAILS.NUMBER_OF_SHARES')} value={item.payerInformation && item.payerInformation.numberOfShares} />
						<CardItem label={t('CONTRIBUTION.DETAILS.SECURITY_SYMBOL')} value={item.payerInformation && item.payerInformation.securitySymbol} />
						<CardItem label={t('CONTRIBUTION.DETAILS.STATE')} value={item.payerInformation && item.payerInformation.state} />
						<CardItem label={t('CONTRIBUTION.DETAILS.ZIP_CODE')} value={item.payerInformation && item.payerInformation.zipCode} />
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default ContributionGeneralInformationTemplate;

ContributionGeneralInformationTemplate.propTypes = {
	item: PropTypes.object,
	t: PropTypes.func,
};
