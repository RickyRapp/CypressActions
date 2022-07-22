/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const PastGrantSummaryLoader = props => {
	const { category } = props;
	const ref = useRef(null);
	const [loaderWidth, setLoaderWidth] = useState(0);

	useEffect(() => {
		setLoaderWidth(ref.current.offsetWidth);
	}, []);

	return (
		<div ref={ref}>
			<TotalMoneyLoader loaderWidth={loaderWidth} props={props} />
			<GivingGoalLoader loaderWidth={loaderWidth} props={props} />
			<PieChartLoader loaderWidth={loaderWidth} props={props} category={category} />
			<GraphLoader loaderwidth={loaderWidth} props={props} category={category} />
		</div>
	);
};

export default PastGrantSummaryLoader;

const TotalMoneyLoader = ({ loaderWidth, props }) => {
	return (
		<div className="summary__wrapper--loader">
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="114"
				viewBox={`0 0 ${loaderWidth} 114`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="4" ry="4" width={'100%'} height="114" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="114"
				viewBox={`0 0 ${loaderWidth} 114`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="4" ry="4" width={'100%'} height="114" />
			</ContentLoader>
		</div>
	);
};

const GivingGoalLoader = ({ loaderWidth, props }) => {
	return (
		<div>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="86"
				viewBox={`0 0 ${loaderWidth} 65`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="4" ry="4" width="90" height="16" />
				<rect x="0" y={26} rx="4" ry="4" width="100%" height="10" />
				<rect x="0" y={44} rx="4" ry="4" width="60" height="8" />
				<rect x="75%" y={44} rx="4" ry="4" width="25%" height="8" />
			</ContentLoader>
		</div>
	);
};

const PieChartLoader = ({ loaderWidth, category = 11, props }) => {
	const categoryList = [];

	let y = 38;

	for (let i = 0; i <= category; i++) {
		let textWidth = Math.random() * 50 + 150;
		categoryList.push(
			<React.Fragment key={`${i}_${textWidth}`}>
				<rect x="40%" y={y} rx="4" ry="4" width="3%" height="2" />
				<rect x="45%" y={y} rx="4" ry="4" width={textWidth} height="6" />
			</React.Fragment>
		);

		y += 18;
	}

	return (
		<div>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="290"
				viewBox={`0 0 ${loaderWidth} 300`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="4" ry="4" width="160" height="12" />
				<circle cx="16%" cy="47%" r="15%" />
				{categoryList}
			</ContentLoader>
		</div>
	);
};

const GraphLoader = props => {
	const { loaderwidth, yOffset = 90, graphYItemsLength = 7, graphXItemsLength = 10 } = props;

	const graphYItems = [];
	const graphXItems = [];

	let y = yOffset;
	let x = 100;

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
		<ContentLoader
			speed={2}
			width={loaderwidth}
			height="290"
			viewBox={`0 0 ${loaderwidth} 300`}
			backgroundColor="#a5aec0"
			foregroundColor="#b5bdc7"
			{...props}
		>
			<rect x="0" y={0} rx="4" ry="4" width="260" height="12" />

			<rect x="0" y={40} rx="4" ry="4" width="60" height="12" />
			<rect x="80" y={32} rx="4" ry="4" width="140" height="30" />

			{graphYItems}
			{graphXItems}
			<rect x="28%" y={y + 18} rx="4" ry="4" width={'180'} height="8" />
			<rect x="54%" y={y + 18} rx="4" ry="4" width={'180'} height="8" />
		</ContentLoader>
	);
};
