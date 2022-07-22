/* eslint-disable react/prop-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const PastGrantSummaryLoader = props => {
	const { category } = props;
	const screenWidth = window.innerWidth;
    let loaderWidth = "100%";
    
    if (screenWidth > 1440) {
        loaderWidth = 540;
    } else if (screenWidth > 990) {
        loaderWidth = screenWidth - 380;
    } else {
        loaderWidth = screenWidth - 40;
    }

	return (
		<React.Fragment>
			<TotalMoneyLoader loaderWidth={loaderWidth} screenWidth={screenWidth} props={props} />
			<GivingGoalLoader loaderWidth={loaderWidth} screenWidth={screenWidth} props={props} />
			<PieChart loaderWidth={loaderWidth} screenWidth={screenWidth} props={props} category={category} />
			<GraphLoader loaderWidth={loaderWidth} screenWidth={screenWidth} props={props} category={category} />
		</React.Fragment>
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

const PieChart = ({ loaderWidth, category = 11, props }) => {
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

const GraphLoader = ({ loaderWidth, props }) => {
	return (
		<ContentLoader
			speed={2}
			width={loaderWidth}
			height="350"
			viewBox={`0 0 ${loaderWidth} 350`}
			backgroundColor="#a5aec0"
			foregroundColor="#b5bdc7"
			{...props}
		>
            <rect x="0" y={0} rx="4" ry="4" width="260" height="12" />
            
            <rect x="0" y={40} rx="4" ry="4" width="60" height="12" />
            <rect x="80" y={32} rx="4" ry="4" width="140" height="30" />

            <rect x="0" y={75} rx="4" ry="4" width="100%" height="240" />
            {/* <rect x="0" y={325} rx="4" ry="4" width="50%" height="12" /> */}
		</ContentLoader>
	);
};
