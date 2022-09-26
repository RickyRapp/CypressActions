import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
	BaasicButton,
	ListContent,
	BaasicInput,
	NumberFormatInput,
	TableFilter,
	BaasicDropdown,
	SimpleBaasicTable,
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const CharityAdvancedSearchTemplate = function({ charityAdvancedSearchViewStore }) {
	const { tableStore, loadMoreClick, queryUtility, charityTypeDropdownStore, expanded } = charityAdvancedSearchViewStore;

	return (
		<ListContent>
			<Content>
				<div className="u-mar--bottom--sml">
					<TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false} showSearch={false} visibleByDefault={expanded} showToggle={false}>
						<div className="row">
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="name"
									className="input input--lrg"
									value={queryUtility.filter.name || ''}
									onChange={event => (queryUtility.filter.name = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.NAME_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="dba"
									className="input input--lrg"
									value={queryUtility.filter.dba || ''}
									onChange={event => (queryUtility.filter.dba = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.DBA_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="emails"
									className="input input--lrg"
									value={queryUtility.filter.emails || ''}
									onChange={event => (queryUtility.filter.emails = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.EMAILS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicDropdown
									store={charityTypeDropdownStore}
									placeholder="CHARITY.LIST.FILTER.CHARITY_TYPE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<BaasicInput
									id="address"
									className="input input--lrg"
									value={queryUtility.filter.address || ''}
									onChange={event => (queryUtility.filter.address = event.target.value)}
									placeholder="CHARITY.LIST.FILTER.ADDRESS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
								<NumberFormatInput
									className="input input--lrg"
									value={queryUtility.filter.taxId || ''}
									onChange={event => (queryUtility.filter.taxId = event.value)}
									format="##-#######"
								/>
							</div>
						</div>
					</TableFilter>
				</div>
				<SimpleBaasicTable tableStore={tableStore} actionsComponent={renderActions} />
				{tableStore.dataInitialized && (
					<BaasicButton
						className="btn btn--med btn--primary u-mar--top--med u-push"
						label="CHARITY.LIST.BUTTON.LOAD_MORE"
						disabled={!tableStore.hasRemainingData}
						onClick={loadMoreClick}
					></BaasicButton>
				)}
			</Content>
		</ListContent>
	);
};

CharityAdvancedSearchTemplate.propTypes = {
	charityAdvancedSearchViewStore: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

function renderActions({ item, actions }) {
	if (!isSome(actions)) return null;

	const { onSelect } = actions;
	if (!isSome(onSelect)) return null;

	return (
		<td>
			<div className="type--right">
				{isSome(onSelect) ? (
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--go-to u-icon--base" //TODO replace correct icon
						label="CHARITY.LIST.BUTTON.SELECT"
						onlyIcon={true}
						onClick={() => onSelect(item)}
					></BaasicButton>
				) : null}
			</div>
		</td>
	);
}

renderActions.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
};

export default defaultTemplate(CharityAdvancedSearchTemplate);
