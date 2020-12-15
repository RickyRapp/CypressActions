import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState, BaasicInput, NumberFormatInput } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const CharityListTemplate = function({ charityViewStore }) {
	const { tableStore, routes, queryUtility, authorization } = charityViewStore;

	return (
		<ApplicationListLayout store={charityViewStore} authorization={authorization}>
			<PageHeader routes={routes}></PageHeader>
			<Content emptyRenderer={renderEmpty(routes)}>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
							<div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
								<BaasicInput
									className="input input--lrg"
									value={queryUtility.filter['name'] || ''}
									onChange={event => (queryUtility.filter['name'] = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.NAME_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
								<BaasicInput
									className="input input--lrg"
									value={queryUtility.filter['emails'] || ''}
									onChange={event => (queryUtility.filter['emails'] = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.EMAILS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
								<BaasicInput
									className="input input--lrg"
									value={queryUtility.filter['address'] || ''}
									onChange={event => (queryUtility.filter['address'] = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.ADDRESS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
								<NumberFormatInput
									className="input input--lrg"
									value={queryUtility.filter['taxId']}
									onChange={event => (queryUtility.filter['taxId'] = event.value)}
									format="##-#######"
								/>
							</div>
						</TableFilter>
					</div>
					<BaasicTable authorization={authorization} tableStore={tableStore} actionsComponent={renderActions} />
				</div>
			</Content>
		</ApplicationListLayout>
	);
};

function renderEmpty(routes) {
	return (
		<EmptyState
			image={EmptyIcon}
			title="CHARITY.LIST.EMPTY_STATE.TITLE"
			actionLabel="CHARITY.LIST.EMPTY_STATE.ACTION"
			callToAction={routes.create}
		/>
	);
}

CharityListTemplate.propTypes = {
	charityViewStore: PropTypes.object.isRequired,
};

function renderActions({ item, actions, authorization }) {
	if (!isSome(actions)) return null;

	const { onEdit } = actions;
	if (!isSome(onEdit)) return null;

	return (
		<td>
			<div className="type--right">
				{isSome(onEdit) ? (
					<BaasicButton
						authorization={authorization ? authorization.update : null}
						className="btn btn--icon"
						icon="u-icon u-icon--edit u-icon--sml"
						label="CHARITY.LIST.BUTTON.EDIT"
						onlyIcon={true}
						onClick={() => onEdit(item)}
					></BaasicButton>
				) : null}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
	authorization: PropTypes.any,
};

export default defaultTemplate(CharityListTemplate);
