import React from 'react';
import ContentLoader from 'react-content-loader';

const BookletSummaryCardLoader = props => {
	let loaderWidth = 450;

	return (
		<ContentLoader
			speed={2}
			width={loaderWidth}
			height="100%"
			viewBox={`0 0 ${loaderWidth} 510`}
			backgroundColor="#a5aec0"
			foregroundColor="#b5bdc7"
			{...props}
		>
			<React.Fragment>
				<rect x="0" y={0} rx="6" ry="6" width="100%" height="80" />
				<rect x="0" y={120} rx="6" ry="6" width="45%" height="26" />
				<rect x="0" y={158} rx="6" ry="6" width="100%" height="265" />

				<rect x="80%" y={450} rx="6" ry="6" width="20%" height="26" />
				<rect x="55%" y={485} rx="6" ry="6" width="45%" height="20" />
			</React.Fragment>
		</ContentLoader>
	);
};

export default BookletSummaryCardLoader;
