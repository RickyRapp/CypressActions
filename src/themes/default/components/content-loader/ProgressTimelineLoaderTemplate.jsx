/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const ProgressTimelineLoaderTemplate = ({ steps = 4, props }) => {
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const stepsList = [];
	let x = 0;
	let circleX = 12;

	for (let i = 0; i <= steps; i++) {
		stepsList.push(
			<React.Fragment key={`${i}_${stepsList.length}`}>
				<circle cx={circleX + 8} cy="12" r="12" />

				{i  < steps - 1 && (
					<React.Fragment>
						<rect x={x + 40} y={12} rx="4" ry="4" width={loaderWidth / steps - 40} height="2" />
					</React.Fragment>
				)}

				<rect x={circleX} y={40} rx="4" ry="4" width={100} height="8" />
			</React.Fragment>
		);

		x += loaderWidth / steps;
		circleX += loaderWidth / steps;
	}

	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={80}
				viewBox={`0 0 ${loaderWidth} 80`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{stepsList}
			</ContentLoader>
		</div>
	);
};

export default ProgressTimelineLoaderTemplate;
