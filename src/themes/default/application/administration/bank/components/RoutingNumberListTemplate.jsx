import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicTable,
	TableFilter,
	EmptyState,
	BaasicModal,
	BaasicButton,
	BaasicInput,
	BaasicDropdown,
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { Content } from 'core/layouts';
import { RoutingNumberCreate } from 'application/administration/bank/components';

const RoutingNumberListTemplate = function({ routingNumberViewStore }) {
	const { tableStore, routes, queryUtility, authorization, createModal, bankDropdownStore } = routingNumberViewStore;

	return (
		<React.Fragment>
			<Content emptyRenderer={renderEmpty(routes)}>
				<div className="type--right">
					<BaasicButton
						className="btn btn--med btn--primary u-mar--right--med"
						label={'LIST_LAYOUT.CREATE_BUTTON'}
						onClick={routes.create}
					/>
				</div>
				<div className="card--tertiary card--med u-mar--top--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
							<div className="col col-sml-3 u-mar--bottom--sml">
								<BaasicDropdown store={bankDropdownStore} placeholder="ROUTING_NUMBER.LIST.FILTER.BANK_PLACEHOLDER" />
							</div>
							<div className="col col-sml-3 u-mar--bottom--sml">
								<BaasicInput
									className="input input--lrg"
									value={queryUtility.filter['number'] || ''}
									onChange={event => (queryUtility.filter['number'] = event.target.value)}
									placeholder="ROUTING_NUMBER.LIST.FILTER.NUMBER_PLACEHOLDER"
								/>
							</div>
						</TableFilter>
					</div>
					<BaasicTable authorization={authorization} tableStore={tableStore} />
				</div>
			</Content>
			<BaasicModal modalParams={createModal}>
				<RoutingNumberCreate />
			</BaasicModal>
		</React.Fragment>
	);
};

function renderEmpty(routes) {
	return (
		<EmptyState
			image={EmptyIcon}
			title="ROUTING_NUMBER.LIST.EMPTY_STATE.TITLE"
			actionLabel="ROUTING_NUMBER.LIST.EMPTY_STATE.ACTION"
			callToAction={routes.create}
		/>
	);
}

RoutingNumberListTemplate.propTypes = {
	routingNumberViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
};

export default defaultTemplate(RoutingNumberListTemplate);
