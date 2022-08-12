/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const BasicFooterActions = ({ numActions = 2, props }) => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const actionsList = [];
	let x = 140;

	for (let i = 0; i < numActions; i++) {
		actionsList.push(
			<React.Fragment key={`${i}_${actionsList.length}`}>
				<rect x={loaderWidth - x} y={0} rx="4" ry="4" width="140" height="46" />
			</React.Fragment>
		);

		x += 150;
	}

	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} 46`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{actionsList}
			</ContentLoader>
		</div>
	);
};

export default BasicFooterActions;
