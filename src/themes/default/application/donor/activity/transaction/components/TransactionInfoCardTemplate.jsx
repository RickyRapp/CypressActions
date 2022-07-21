import React from 'react';
import { FormatterResolver } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import PropTypes from 'prop-types';

const TransactionInfoCardTemplate = function({ donor, title, balance, customClassName }) {
	return (
		<div className={`transaction__card ${customClassName ? customClassName : ''}`}>
			<div className={`transaction__card--amount ${balance >= 0 ? 'transaction__card--amount--plus' : ''}`}>
				<FormatterResolver item={{ balance: balance }} field="balance" format={{ type: 'currency' }} />
			</div>
			<h5 className="transaction__card--title">{title}</h5>
		</div>
	);
};

export default defaultTemplate(TransactionInfoCardTemplate);

TransactionInfoCardTemplate.propTypes = {
	donor: PropTypes.any,
	balance: PropTypes.number,
	title: PropTypes.string,
	customClassName: PropTypes.string,
};
