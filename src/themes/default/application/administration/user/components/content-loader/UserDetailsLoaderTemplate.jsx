import React from 'react';
import { BasicInputLoaderTemplate, BasicLineLoaderTemplate } from 'themes/components';

const UserDetailsLoaderTemplate = () => {
	return (
		<div>
			<BasicInputLoaderTemplate />
			<BasicInputLoaderTemplate />
			<BasicInputLoaderTemplate />
			<BasicLineLoaderTemplate numLines={4} />
		</div>
	);
};

export default UserDetailsLoaderTemplate;
