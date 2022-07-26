import React, { useState, useCallback } from "react";
import ContentLoader from 'react-content-loader';

const BookletSummaryCardLoader = props => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);
	
	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} 455`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<React.Fragment>
					<rect x="0" y={0} rx="6" ry="6" width="100%" height="80" />
					<rect x="0" y={120} rx="6" ry="6" width="45%" height="26" />
					<rect x="0" y={158} rx="6" ry="6" width="100%" height="225" />

					<rect x="80%" y={400} rx="6" ry="6" width="20%" height="26" />
					<rect x="55%" y={435} rx="6" ry="6" width="45%" height="20" />
				</React.Fragment>
			</ContentLoader>
		</div>
	);
};

export default BookletSummaryCardLoader;
