/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const SessionPreviewDetailsLoaderTemplate = ({ col = 3, row = 4, props }) => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const lineList = [];
	let x = 0;
	let y = 0;

	for (let i = 0; i < row; i++) {
        let textWidth = Math.random() * 50 + 250;
        
        for (let j = 0; j < col; j++) {
			lineList.push(
				<React.Fragment key={`${i}_${lineList.length}`}>
					<rect x={x} y={y} rx="4" ry="4" width={120} height="10" />
					<rect x={x} y={y + 24} rx="4" ry="4" width={textWidth} height="10" />
				</React.Fragment>
			);

			x += loaderWidth / col;
		}

		x = 0;
		y += 73;
	}
	return (
		<div ref={ref} className="card--primary card--med u-mar--bottom--med">
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} ${y - 35}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{lineList}
			</ContentLoader>
		</div>
	);
};

export default SessionPreviewDetailsLoaderTemplate;
