import React from 'react';
import PropTypes from 'prop-types';

const CardItem = ({ label, value, t }) => {
	return (
		<div className="card--column--med">
			<span className="type--base type--wgt--medium type--color--opaque">{t(`${label}`)}</span>

			<span className="type--base type--wgt--bold u-push">
				{value}
			</span>
		</div>
	);
};

export default CardItem;

CardItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
	t: PropTypes.func,
}