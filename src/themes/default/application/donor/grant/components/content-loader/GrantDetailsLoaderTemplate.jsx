/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import ContentLoader from 'react-content-loader';

const GrantDetailsLoaderTemplate = props => {
	const loaderheight = 600;
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
				width={loaderWidth / 2}
				height={loaderheight}
				viewBox={`0 0 ${loaderWidth / 2} ${loaderheight}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={50} rx="4" ry="4" width={'100%'} height={114} />
			</ContentLoader>
		</div>
	);
};

export default GrantDetailsLoaderTemplate;
