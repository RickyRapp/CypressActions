import React from 'react';
import PropTypes from 'prop-types';

import { BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function PageHeaderTemplate({ children, rootStore, routes, t, hideTitle = false, coreResolving, menuStore, ...props }) {
	const activeRoute = rootStore.routerStore.routes.find(c => c.name === rootStore.routerStore.routerState.routeName);
	const title = activeRoute.data ? activeRoute.data.title : '';

	return (
		<div className="layout__header header">
			{!coreResolving ? renderHeaderContent(children, props, routes, hideTitle, t, title) : null}

			{!coreResolving && (
				<div className="header__options">
					<div className="header__hamburger" onClick={() => menuStore.toggleMenuOpen()}>
						<i className="u-icon u-icon--med u-icon--menu"></i>
					</div>
				</div>
			)}
		</div>
	);
}

PageHeaderTemplate.propTypes = {
	children: PropTypes.any,
	t: PropTypes.func,
	coreResolving: PropTypes.bool,
	hideTitle: PropTypes.bool,
	rootStore: PropTypes.object,
	menuStore: PropTypes.object,
	routes: PropTypes.any,
};

function renderHeaderContent(children, props, routes, hideTitle, t, title) {
	let contentRender = null;
	if (children) {
		contentRender = typeof children === 'function' ? children(props) : children;
	}

	return (
		<React.Fragment>
			{!hideTitle && (
				<h3
					className={` u-mar--right--sml ${t(title) === 'Profile Settings' ? 'u-display--none--xlrg' : ''
						}`}
				>
					{t(title)}
				</h3>
			)}
			{routes && routes.create ? (
				<BaasicButton
					className="btn btn--base btn--primary u-mar--right--sml"
					label={'LIST_LAYOUT.CREATE_BUTTON'}
					onClick={routes.create}
				/>
			) : null}
			{children && contentRender ? (
				<div className="content__header u-mar--right--sml">
					<div className="row">{contentRender}</div>
				</div>
			) : null}
		</React.Fragment>
	);
}

export default defaultTemplate(PageHeaderTemplate);
