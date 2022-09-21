import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const YourFundsCardLoaderTemplate = props => {
	const screenWidth = window.innerWidth;
	let loaderHeight;

	if (screenWidth > 1200) {
		loaderHeight = 450;
	} else if (screenWidth > 544) {
		loaderHeight = 488;
	} else {
		loaderHeight = 370;
	}

	const [loaderWidth, setLoaderWidth] = useState(0);

	const ref = useCallback(node => {
		if (node !== null) {
			setLoaderWidth(node.getBoundingClientRect().width);
		}
	}, []);

	return (
		<div className="card--primary card--med" ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={loaderHeight}
				viewBox={`0 0 ${loaderWidth} ${loaderHeight}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				{screenWidth > 1200 ? (
					<React.Fragment>
						<rect x="0" y={12} rx="4" ry="4" width={'140'} height="22" />

						<rect x={(loaderWidth / 2) - 150} y={115} rx="4" ry="4" width={'300'} height="45" />
						<rect x={(loaderWidth / 2) - 95} y={175} rx="4" ry="4" width={'190'} height="12" />

						<rect x={(loaderWidth / 2) - 110} y={240} rx="4" ry="4" width={'220'} height="35" />
						<rect x={(loaderWidth / 2) - 95} y={300} rx="4" ry="4" width={'190'} height="12" />

						<rect x="0%" y={'86%'} rx="4" ry="4" width={'46%'} height="60" />
						<rect x="54%" y={'86%'} rx="4" ry="4" width={'46%'} height="60" />
					</React.Fragment>
				) : screenWidth > 544 ? (
					<React.Fragment>
						<rect x="0" y={6} rx="4" ry="4" width={'140'} height="22" />

						<rect x={(loaderWidth / 2) - 150} y={80} rx="4" ry="4" width={'300'} height="45" />
						<rect x={(loaderWidth / 2) - 95} y={150} rx="4" ry="4" width={'190'} height="12" />

						<rect x={(loaderWidth / 2) - 110} y={240} rx="4" ry="4" width={'220'} height="35" />
						<rect x={(loaderWidth / 2) - 95} y={300} rx="4" ry="4" width={'190'} height="12" />

						<rect x="0%" y={'86%'} rx="4" ry="4" width={'46%'} height="60" />
						<rect x="54%" y={'86%'} rx="4" ry="4" width={'46%'} height="60" />
					</React.Fragment>
				) : (
					<React.Fragment>
						<rect x="35%" y={0} rx="4" ry="4" width={'140'} height="22" />

						<rect x="17%" y={50} rx="4" ry="4" width={'300'} height="45" />
						<rect x="30%" y={110} rx="4" ry="4" width={'190'} height="12" />

						<rect x="27%" y={160} rx="4" ry="4" width={'220'} height="35" />
						<rect x="30%" y={210} rx="4" ry="4" width={'190'} height="12" />

						<rect x="0" y={250} rx="4" ry="4" width={'100%'} height="48" />
						<rect x="0" y={310} rx="4" ry="4" width={'100%'} height="48" />
					</React.Fragment>
				)}
			</ContentLoader>
		</div>
	);
};

export default YourFundsCardLoaderTemplate;