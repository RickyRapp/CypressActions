/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import ContentLoader from 'react-content-loader';

const YourGivingCardLoaderTemplate = props => {
	const screenWidth = window.innerWidth;
	const mobileScreen = window.innerWidth > 750;
	let loaderheight;

	if (screenWidth > 1200) {
		loaderheight = 450;
	} else {
		loaderheight = 308;
	}

	const [loaderWidth, setLoaderWidth] = useState(0);
	
	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	return (
		<div className="card--primary card--med u-mar--bottom--sml" ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={loaderheight}
				viewBox={`0 0 ${loaderWidth} ${loaderheight}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={6} rx="4" ry="4" width={'140'} height="16" />
				{mobileScreen && (
					<React.Fragment>
						<rect x="55%" y={6} rx="4" ry="4" width={'200'} height="16" />
						<rect x="0" y={64} rx="4" ry="4" width={'100'} height="10" />
						<rect x="120" y={38} rx="29" ry="29" width={'66%'} height="58" />
						<rect x="84%" y={64} rx="4" ry="4" width={'100'} height="10" />

						<rect x="0%" y={115} rx="4" ry="4" width={'100%'} height="1" />

					</React.Fragment>
				)}

				<rect x="0" y={!mobileScreen ? 64 : 150} rx="4" ry="4" width={'80'} height="10" />
				<rect x="120" y={!mobileScreen ? 50 : 135} rx="4" ry="4" width={'180'} height="36" />
				<GraphLoader loaderwidth={loaderWidth} yOffset={mobileScreen ? 200 : 120} />
			</ContentLoader>
		</div>
	);
};

export default YourGivingCardLoaderTemplate;

const GraphLoader = props => {
	const { loaderwidth, yOffset = 0, graphYItemsLength = 7, graphXItemsLength = 7 } = props;

	const graphYItems = [];
	const graphXItems = [];

	let y = yOffset;
	let x = 135;

	for (let i = 0; i <= graphYItemsLength; i++) {
		graphYItems.push(
			<React.Fragment key={`${i}_${graphYItems}`}>
				<rect
					x={i === graphYItemsLength ? '40' : '0'}
					y={y}
					rx="4"
					ry="4"
					width={i === graphYItemsLength ? '30' : '70'}
					height="6"
				/>
				<rect x="85" y={y + 3} rx="4" ry="4" width={'100%'} height="1" />
			</React.Fragment>
		);

		y += 26;
	}

	for (let i = 0; i <= graphXItemsLength; i++) {
		graphXItems.push(
			<React.Fragment key={`${i}_${graphYItems}`}>
				<rect x={x} y={y - 13} rx="4" ry="4" width={'40'} height="12" />
			</React.Fragment>
		);

		x += loaderwidth / graphXItemsLength;
	}

	return (
		<React.Fragment>
			{graphYItems}
			{graphXItems}
			<rect x="28%" y={y + 18} rx="4" ry="4" width={'180'} height="8" />
			<rect x="54%" y={y + 18} rx="4" ry="4" width={'180'} height="8" />
		</React.Fragment>
	);
};
