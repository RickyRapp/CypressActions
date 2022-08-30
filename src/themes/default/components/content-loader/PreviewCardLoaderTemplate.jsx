/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const PreviewCardLoaderTemplate = props => {
	const { items = 8 } = props;
	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const itemHeight = 72;
	const tableList = [];
	let y = 0;

	for (let i = 0; i < items; i++) {
		let textWidthFirst = Math.random() * (150 - 100) + 200;

		tableList.push(
			<React.Fragment key={`${i}_${tableList.length}`}>
				<rect x="0" y={y} rx="4" ry="4" width={'100'} height="10" />
				<rect x="0" y={y + 20} rx="4" ry="4" width={textWidthFirst} height="16" />
			</React.Fragment>
		);

		y += itemHeight;
    }
    
	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={y - itemHeight / 2}
				viewBox={`0 0 ${loaderWidth} ${y - itemHeight / 2}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{tableList}
			</ContentLoader>
		</div>
	);
};

export default PreviewCardLoaderTemplate;
