import React, { useRef, useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const InsightsCardLoaderTemplate = props => {
	const loaderheight = 300;
	const ref = useRef(null);
	const [loaderWidth, setLoaderWidth] = useState(0);

	useEffect(() => {
		setLoaderWidth(ref.current.offsetWidth);
	}, []);

	return (
		<div ref={ref}>
			<div className="summary__wrapper--loader">
				<ContentLoader
					speed={2}
					width={loaderWidth / 2}
					height={loaderheight}
					viewBox={`0 0 ${loaderWidth / 2} ${loaderheight}`}
					backgroundColor="#a5aec0"
					foregroundColor="#b5bdc7"
					{...props}
				>
					<rect x="0" y={8} rx="4" ry="4" width={'100'} height="14" />
					<rect x="0" y={50} rx="4" ry="4" width={'100%'} height={114} />
					
                    <rect x="0" y={220} rx="4" ry="4" width={'130'} height="14" />
                    <rect x="0" y={270} rx="4" ry="4" width={'250'} height="10" />
				</ContentLoader>
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
		</div>
	);
};

export default InsightsCardLoaderTemplate;
