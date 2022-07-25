import React, { useRef, useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const GrantDetailsLoaderTemplate = (props) => {
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
