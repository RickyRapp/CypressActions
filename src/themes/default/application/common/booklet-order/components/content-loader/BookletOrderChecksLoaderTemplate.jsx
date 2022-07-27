/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

const BookletOrderChecksLoaderTemplate = props => {
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
				height="100%"
				viewBox={`0 0 ${loaderWidth} 55`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="6" ry="6" width="150" height="42" />
				<rect x="170" y={0} rx="6" ry="6" width="150" height="42" />
				<rect x="0" y={53} rx="6" ry="6" width="100%" height="1" />
			</ContentLoader>

			<BookletListLoader loaderWidth={loaderWidth} />

			<ContentLoader
				speed={2}
				width={loaderWidth}
				height="100%"
				viewBox={`0 0 ${loaderWidth} 50`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
				{...props}
			>
				<rect x="0" y={0} rx="24" ry="24" width="100%" height="48" />
			</ContentLoader>
		</div>
	);
};

export default BookletOrderChecksLoaderTemplate;

const BookletListLoader = ({ loaderWidth }) => {
	const screenWidth = window.innerWidth;
	const isMobile = screenWidth < 1450;

	let bookletItems = isMobile ? 6 : 3;
	let bookletItemHeight = isMobile ? 83 : 89;
	const bookletList = [];
	let y = 0;

	for (let i = 0; i < bookletItems; i++) {
		bookletList.push(
			<React.Fragment key={`${i}_${bookletList.length}`}>
				{i === 0 ? (
					<rect x="0" y={y + 24} rx="6" ry="6" width="30%" height="14" />
				) : (
					<React.Fragment>
						<rect x="0" y={y} rx="6" ry="6" width="10%" height="14" />
						<rect x="0" y={y + 24} rx="14" ry="14" width="20%" height="28" />
					</React.Fragment>
				)}

				<rect x="40%" y={y + 12} rx="6" ry="6" width="30%" height="36" />
				<rect x="85%" y={y + 24} rx="6" ry="6" width="15%" height="14" />

				<rect x="0" y={y + 62} rx="6" ry="6" width="100%" height="1" />
			</React.Fragment>
		);

		y += bookletItemHeight;
	}

	return (
		<div className="u-display--flex gap--4">
			<ContentLoader
				speed={2}
				width={!isMobile ? loaderWidth / 2 : loaderWidth}
				height="100%"
				viewBox={`0 0 ${!isMobile ? loaderWidth / 2 : loaderWidth} ${y}`}
				backgroundColor="#a5aec0"
				foregroundColor="#b5bdc7"
			>
				{bookletList}
			</ContentLoader>

			{!isMobile && (
				<ContentLoader
					speed={2}
					width={loaderWidth / 2}
					height="100%"
					viewBox={`0 0 ${loaderWidth / 2} ${y}`}
					backgroundColor="#a5aec0"
					foregroundColor="#b5bdc7"
				>
					{bookletList}
				</ContentLoader>
			)}
		</div>
	);
};
