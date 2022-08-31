/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const GrantPreviewLoaderTemplate = ({ numLines = 4, props }) => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const lineList = [];
	let y = 0;

	for (let i = 0; i < numLines; i++) {
		let textWidth = Math.random() * loaderWidth;

		lineList.push(
			<React.Fragment key={`${i}_${lineList.length}`}>
				<rect x="0" y={y} rx="4" ry="4" width={160} height="10" />
				<rect x="0" y={y + 20} rx="4" ry="4" width={textWidth} height="10" />
			</React.Fragment>
		);

		y += 60;
	}

	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={y}
				viewBox={`0 0 ${loaderWidth} ${y - 30}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{lineList}
			</ContentLoader>
		</div>
	);
};

export default GrantPreviewLoaderTemplate;
