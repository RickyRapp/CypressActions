/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const BasicLineLoaderTemplate = ({ setY = 32, numLines = 4, props }) => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const lineList = [];
	let y = 0;

	for (let i = 0; i < numLines; i++) {
		let textWidth = Math.random() * 50 + 150;

		lineList.push(
			<React.Fragment key={`${i}_${lineList.length}`}>
				<rect x="0" y={y} rx="4" ry="4" width={textWidth} height="10" />
			</React.Fragment>
		);

		y += setY;
	}

	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} ${y}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{lineList}
			</ContentLoader>
		</div>
	);
};

export default BasicLineLoaderTemplate;
