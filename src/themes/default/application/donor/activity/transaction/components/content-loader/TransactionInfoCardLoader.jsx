import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const TransactionInfoCardLoader = props => {
	const { customclassname } = props;
	const screenWidth = window.innerWidth;

	let loaderWidth = screenWidth > 766 ? 300 : 120;

	return (
		<div className={`transaction__card ${customclassname ? customclassname : ''}`}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} 38`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{screenWidth > 1440 ? (
					<React.Fragment>
						<rect x="0" y={0} rx="4" ry="4" width="180" height="30" />
						<rect x="200" y={0} rx="4" ry="4" width="100" height="12" />
						<rect x="200" y={18} rx="4" ry="4" width="100" height="12" />
					</React.Fragment>
				) : (
					<React.Fragment>
						<rect x="13%" y={0} rx="4" ry="4" width="220" height="16" />
						<rect x="33%" y={24} rx="4" ry="4" width="90" height="14" />
					</React.Fragment>
				)}
			</ContentLoader>
		</div>
	);
};

export default TransactionInfoCardLoader;

TransactionInfoCardLoader.propTypes = {
	customclassname: PropTypes.string,
};
