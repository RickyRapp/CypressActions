/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

const InsightsCardTemplate = ({ customClassName, balance, title, textColor }) => {
	return (
		<div className={`card--med type--center ${customClassName ? customClassName : ''}`}>
			<div className={`type--xxlrg type--wgt--medium ${textColor}`}>
				<FormatterResolver item={{ balance: balance }} field="balance" format={{ type: 'currency' }} />
			</div>
			<p className={`type--xsml type--wgt--medium ${textColor}`}>{title}</p>
		</div>
	);
};

export default defaultTemplate(InsightsCardTemplate);

InsightsCardTemplate.PropTypes = {
	customClassName: PropTypes.string,
	balance: PropTypes.number,
	title: PropTypes.string,
};
