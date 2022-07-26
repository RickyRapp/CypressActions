/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import ContentLoader from 'react-content-loader';

const SendGiftLoaderTemplate = props => {
	const loaderheight = 490;
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
                <rect x="0" y={6} rx="4" ry="4" width={'100'} height="22" />
                <rect x="0" y={32} rx="4" ry="4" width={loaderWidth > 400 ? '390' : '320'} height="14" />

                <InputLoader label y={80} />
                <InputLoader label y={80} x={"51%"} />

                <rect x="0" y={170} rx="4" ry="4" width={200} height="14" />
                
                <InputLoader label y={202} fullWidth />
                <InputLoader y={270} fullWidth />
                <InputLoader label y={355} fullWidth />

				<rect x={loaderWidth - 200} y={435} rx="4" ry="4" width={'200'} height="48" />
			</ContentLoader>
		</div>
	);
};

export default SendGiftLoaderTemplate;

const InputLoader = ({x = 0, y, label, fullWidth }) => {
	return (
		<React.Fragment>
			{label && <rect x={x} y={y} rx="4" ry="4" width={'100'} height="8" />}
			<rect x={x} y={y + 14} rx="4" ry="4" width={fullWidth ? "100%" : "49%"} height="48" />
		</React.Fragment>
	);
};