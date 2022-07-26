import React, { useState, useCallback } from "react";
import ContentLoader from 'react-content-loader';

const AvailableBalanceLoaderTemplate = props => {
	const loaderheight = 228;
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
				height={loaderheight}
				viewBox={`0 0 ${loaderWidth} ${loaderheight}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={6} rx="4" ry="4" width={'250'} height="22" />
                <rect x="0" y={50} rx="4" ry="4" width={loaderWidth > 400 ? '390' : '320'} height="14" />
                
				<rect x="28%" y={115} rx="4" ry="4" width={'315'} height="50" />
				<rect x="36.5%" y={185} rx="4" ry="4" width={'200'} height="14" />

			</ContentLoader>
		</div>
	);
};

export default AvailableBalanceLoaderTemplate;
