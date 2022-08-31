import React from 'react';
import { FormatterResolver } from 'core/components';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const PaymentTypeInfoTemplate = ({ paymentType, form, t }) => {
	return (
		<React.Fragment>
			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">
					{t('CONTRIBUTION.CREATE.PAYMENT_TYPE')}
				</span>
				<span className="type--base type--wgt--bold u-push">{paymentType.name}</span>
			</div>

			<div className="card--column--med">
				<span className="type--base type--wgt--medium type--color--opaque">{t('CONTRIBUTION.CREATE.AMOUNT')}</span>
				<span className="type--base type--wgt--bold u-push">
					<FormatterResolver item={{ amount: form.$('amount').value }} field="amount" format={{ type: 'currency' }} />
				</span>
			</div>
		</React.Fragment>
	);
};

export default defaultTemplate(PaymentTypeInfoTemplate);

PaymentTypeInfoTemplate.propTypes = {
	t: PropTypes.func,
	paymentType: PropTypes.any,
	form: PropTypes.object,
};
