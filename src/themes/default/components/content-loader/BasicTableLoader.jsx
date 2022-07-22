/* eslint-disable react/prop-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const BasicTableLoader = ({ tableItemHeight = 50, tableItems = 10, ...props }) => {
    let loaderWidth = "100%";
    
	const tableList = [];
	let y = 0;

	for (let i = 0; i <= tableItems; i++) {
		tableList.push(
			<React.Fragment key={`${i}_${tableList.length}`}>
				<rect x={0} y={y + 6} rx="4" ry="4" width="6%" height="12" />
                <rect x={"8%"} y={y} rx="4" ry="4" width="20%" height="24" />
                <rect x={"29%"} y={y} rx="4" ry="4" width="15%" height="24" />
                <rect x={"45%"} y={y} rx="4" ry="4" width="20%" height="24" />
                <rect x={"66%"} y={y} rx="4" ry="4" width="29%" height="24" />
                <rect x={"96%"} y={y} rx="4" ry="4" width="4%" height="24" />

				<rect x={0} y={y + 38} rx="4" ry="4" width="100%" height="1" />
			</React.Fragment>
		);

        y += tableItemHeight;
	}

	return (
		//   <div className="loader--table">

		// </div>
		<ContentLoader
			speed={2}
			width={loaderWidth}
			height={y}
			viewBox={`0 0 ${loaderWidth} ${y}`}
			backgroundColor="#a5aec0"
			foregroundColor="#b5bdc7"
			{...props}
        >
            {tableList}
		</ContentLoader>
	);
};

export default BasicTableLoader;
