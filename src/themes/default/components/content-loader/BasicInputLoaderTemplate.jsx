/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const BasicInputLoaderTemplate = ({ y = 0, inputWidth, props }) => {
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
				viewBox={`0 0 ${loaderWidth} 85`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<React.Fragment>
					<rect x="0" y={y} rx="6" ry="6" width="140" height="8" />
					<rect x="0" y={y + 16} rx="6" ry="6" width={inputWidth ? inputWidth : '100%'} height="48" />
				</React.Fragment>
			</ContentLoader>
		</div>
	);
};

export default BasicInputLoaderTemplate;
