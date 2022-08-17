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
					<CardItem t={t} label={'CONTRIBUTION.DETAILS.DONOR_NAME'} value={item.donor && item.donor.name} />
				) : (
					<CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYER_NAME'} value={item.payerInformation && item.payerInformation.name} />
                )}
                
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.CONFRIMATION_NUMBER'} value={item && item.confirmationNumber} />
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.STATUS'} value={item && item.contributionStatus.name} />
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.DATE_CREATED'} value={item && <Date format="kendo-input-medium" value={item.dateCreated} />} />
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.DATE_UPDATED'} value={item && <Date format="kendo-input-medium" value={item.dateUpdated} />} />

				{item && item.donor == null && (
                    <React.Fragment>
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.ADDRESS_LINE_1'} value={item.payerInformation && item.payerInformation.addressLine1} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.ADDRESS_LINE_2'} value={item.payerInformation && item.payerInformation.addressLine2} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.CITY'} value={item.payerInformation && item.payerInformation.city} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.NUMBER'} value={item.payerInformation && item.payerInformation.number} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.NUMBER_OF_SHARES'} value={item.payerInformation && item.payerInformation.numberOfShares} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.SECURITY_SYMBOL'} value={item.payerInformation && item.payerInformation.securitySymbol} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.STATE'} value={item.payerInformation && item.payerInformation.state} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.ZIP_CODE'} value={item.payerInformation && item.payerInformation.zipCode} />
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
