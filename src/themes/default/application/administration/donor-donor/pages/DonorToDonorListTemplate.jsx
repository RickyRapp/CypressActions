import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicTable, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const DonorToDonorListTemplate = function({ donorToDonorListViewStore }) {
	const { tableStore, routes, authorization } = donorToDonorListViewStore;

	return (
		<ApplicationListLayout store={donorToDonorListViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content emptyRenderer={renderEmpty(routes)}>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<BaasicTable authorization={authorization} tableStore={tableStore} />
				</div>
			</Content>
		</ApplicationListLayout>
	);
};

function renderEmpty(routes) {
	return (
		<EmptyState
			image={EmptyIcon}
			title="DONOR.LIST.EMPTY_STATE.TITLE"
			actionLabel="DONOR.LIST.EMPTY_STATE.ACTION"
			callToAction={routes.create}
		/>
	);
}

DonorToDonorListTemplate.propTypes = {
	donorToDonorListViewStore: PropTypes.object.isRequired,
};

export default defaultTemplate(DonorToDonorListTemplate);
