import React from 'react';
import PropTypes from 'prop-types';

const CardItem = ({ label, value, customClassName }) => {
	return (
		<div className={`card--column--med ${customClassName ? customClassName : ""}`}>
			<span className="type--base type--wgt--medium type--color--opaque">{label}</span>

			<span className="type--base type--wgt--bold u-push">
				{value}
			</span>
		</div>
	);
};

export default CardItem;

CardItem.propTypes = {
	label: PropTypes.string,
	customClassName: PropTypes.string,
	value: PropTypes.any,
}