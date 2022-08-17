import React from 'react';
import PropTypes from 'prop-types';
import { FormatterResolver } from 'core/components';
import { CardItem } from 'themes/components';

const DepositPaymentInformation = ({ item, t }) => {
	return (
		<div className="card card--primary card--med u-mar--bottom--med">
			<h3 className="col col-sml-12 u-mar--bottom--med">{t('CONTRIBUTION.DETAILS.PAYMENT_INFORMATION')}</h3>
			
            <div className="card--secondary card--med">
				<CardItem t={t} label={'CONTRIBUTION.DETAILS.PAYMENT_TYPE'} value={item && item.paymentType.name} />
				<CardItem
					t={t}
					label={'CONTRIBUTION.DETAILS.AMOUNT'}
					value={
						item && <FormatterResolver item={{ amount: item.amount }} field="amount" format={{ type: 'currency' }} />
					}
				/>
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

export default DepositPaymentInformation;

DepositPaymentInformation.propTypes = {
	item: PropTypes.object,
	t: PropTypes.func,
};
