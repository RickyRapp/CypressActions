import React, { useRef, useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const TransfersCardLoaderTemplate = props => {
    const ref = useRef(null);
	const [loaderWidth, setLoaderWidth] = useState(0);
    
	useEffect(() => {
        setLoaderWidth(ref.current.offsetWidth);
    }, []);
    
    const loaderHeight = 490;
	const tableList = [];
    const tableItems = 3;
    const tableItemHeight = 43;
	let y = 90;

	for (let i = 0; i <= tableItems; i++) {
		tableList.push(
			<React.Fragment key={`${i}_${tableList.length}`}>
				<rect x={0} y={y} rx="4" ry="4" width="20%" height="14" />
				<rect x={'35%'} y={y} rx="4" ry="4" width="20%" height="14" />
				<rect x={'75%'} y={y} rx="4" ry="4" width="20%" height="14" />

                <rect x={0} y={y + 24} rx="4" ry="4" width="100%" height="1" />
			</React.Fragment>
		);

		y += tableItemHeight;
	}

	return (
		<div ref={ref}>
			<ContentLoader
				speed={2}
				width={loaderWidth}
				height={loaderHeight}
				viewBox={`0 0 ${loaderWidth} ${loaderHeight}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x={'0'} y={6} rx="4" ry="4" width="120" height="22" />
                <rect x={'0'} y={50} rx="4" ry="4" width="160" height="14" />
                
                {tableList}

                <rect x={'0'} y={y + 9} rx="4" ry="4" width="100%" height="200" />
            </ContentLoader>
		</div>
	);
};

export default TransfersCardLoaderTemplate;
