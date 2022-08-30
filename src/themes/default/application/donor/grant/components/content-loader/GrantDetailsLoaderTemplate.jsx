import React, { useRef, useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const GrantDetailsLoaderTemplate = props => {
	const loaderheight = 600;
	const ref = useRef(null);
	const [loaderWidth, setLoaderWidth] = useState(0);

	useEffect(() => {
		setLoaderWidth(ref.current.offsetWidth);
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
				<rect x="0" y={8} rx="4" ry="4" width={'130'} height="22" />
				<rect x="0" y={50} rx="4" ry="4" width={'100%'} height="48" />

				<ToggleLoader y={115} />
				<rect x={loaderWidth - 130} y={122} rx="4" ry="4" width={'130'} height="10" />

				<InputLoader y={170} label />
				<InputLoader y={170} x={'51%'} label />

				<ToggleLoader y={255} />

				<InputLoader y={310} label />
				<InputLoader y={375} fullWidth />
				<InputLoader y={460} fullWidth label />

				<rect x={loaderWidth - 100} y={550} rx="4" ry="4" width={'100'} height="48" />
			</ContentLoader>
		</div>
	);
};

export default GrantDetailsLoaderTemplate;

// eslint-disable-next-line react/prop-types
const InputLoader = ({ x = 0, y, label, fullWidth }) => {
	return (
		<React.Fragment>
			{label && <rect x={x} y={y} rx="4" ry="4" width={'100'} height="8" />}
			<rect x={x} y={y + 14} rx="4" ry="4" width={fullWidth ? '100%' : '49%'} height="48" />
		</React.Fragment>
	);
};

// eslint-disable-next-line react/prop-types
const ToggleLoader = ({ y }) => {
	return (
		<React.Fragment>
			<rect x={64} y={y + 8} rx="4" ry="4" width={'100'} height="8" />
			<rect x={0} y={y} rx="13" ry="13" width={52} height="26" />
		</React.Fragment>
	);
};
