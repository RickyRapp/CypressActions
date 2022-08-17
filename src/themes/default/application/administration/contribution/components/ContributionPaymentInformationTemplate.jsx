import React from 'react';
import PropTypes from 'prop-types';
import { FormatterResolver } from 'core/components';
import { CardItem } from 'themes/components';

const ContributionPaymentInformationTemplate = ({ item, t }) => {
	return (
		<div className="card card--primary card--med u-mar--bottom--med">
            <h3 className=" u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.PAYMENT_INFORMATION')}</h3>
            <div className="card--secondary card--sml">
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYMENT_TYPE'} value={item && item.paymentType.name} />
                <CardItem t={t} label={'CONTRIBUTION.DETAILS.AMOUNT'} value={(<FormatterResolver item={{ amount: item.amount }} field="amount" format={{ type: 'currency' }} />)} />

                {item && item.isThirdParty && (
                    <React.Fragment>
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYER_NAME'} value={item.payerInformation.name} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYER_EMAIL'} value={item.payerInformation.email} />
                        <CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYER_NUMBER'} value={item.payerInformation.number} />
                        <CardItem
                            t={t}
                            label={'CONTRIBUTION.DETAILS.PAYER_ADDRESS'}
                            value={
                                <FormatterResolver
                                    item={{ address: item.payerInformation }}
                                    field="address"
                                    format={{ type: 'address', value: 'full' }}
                                />
                            }
                        />
                    </React.Fragment>
                )}
			</div>
		</div>
	);
};

export default ContributionPaymentInformationTemplate;

ContributionPaymentInformationTemplate.propTypes = {
	item: PropTypes.object,
	t: PropTypes.func,
};
