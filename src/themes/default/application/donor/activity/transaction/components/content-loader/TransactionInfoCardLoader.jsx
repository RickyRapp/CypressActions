import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const TransactionInfoCardLoader = props => {
	const { customClassName } = props;
	let loaderWidth = 300;

	return (
		<div className={`transaction__card ${customClassName ? customClassName : ''}`}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} 33`}
				backgroundColor="#ccd3df"
				foregroundColor="#c7d0e2"
				{...props}
			>
				<React.Fragment>
					<rect x="0" y={0} rx="6" ry="6" width="180" height="30" />
					<rect x="200" y={0} rx="6" ry="6" width="100" height="12" />
					<rect x="200" y={18} rx="6" ry="6" width="100" height="12" />
				</React.Fragment>
			</ContentLoader>
		</div>
	);
};

export default TransactionInfoCardLoader;

TransactionInfoCardLoader.propTypes = {
	customClassName: PropTypes.string,
};
