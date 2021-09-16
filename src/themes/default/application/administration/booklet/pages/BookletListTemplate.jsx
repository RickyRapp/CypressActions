import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, BaasicInput, BaasicDropdown } from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const BookletListTemplate = function({ bookletViewStore }) {
	const { routes, tableStore, queryUtility, authorization, denominationTypeDropdownStore,
	bookletStatusDropdownStore, bookletTypeDropdownStore, exportExcel, resourcesModel } = bookletViewStore;

	return (
		<ApplicationListLayout store={bookletViewStore} authorization={authorization}>
			<PageHeader routes={routes} />
			<Content>
			<div className="row row__align--end" style={{marginBottom: '15px'}}>
            <div className="col col-sml-12 col-lrg-5 col-xxlrg-5 u-mar--top--sml">
                <label className="form__group__label">Starting Code</label>
                <BaasicInput field={resourcesModel.codeStart} onChange={e => {resourcesModel.codeStart = parseInt(e.target.value)}}/>
            </div>
			<div className="col col-sml-12 col-lrg-5 col-xxlrg-5 u-mar--top--sml">
                <label className="form__group__label">Ending Code</label>
                <BaasicInput field={resourcesModel.codeEnd} onChange={e => {resourcesModel.codeEnd = parseInt(e.target.value)}}/>
            </div>
            <div className="col col-sml-12 col-xxlrg-2 type--right u-mar--top--sml">
				<BaasicButton
                            className='btn btn--med btn--primary'
                            label='EXPORT'
							onClick={() => exportExcel()}
                            />
            </div>
        </div>
				<div className="card--tertiary card--med u-mar--bottom--sml">
					<div className="u-mar--bottom--med">
						<TableFilter queryUtility={queryUtility}>
							<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
								<BaasicInput
									id="codes"
									className="input input--lrg"
									value={queryUtility.filter.codes || ''}
									onChange={event => (queryUtility.filter.codes = event.target.value)}
									placeholder="BOOKLET.LIST.FILTER.CODES_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
								<BaasicDropdown
									store={denominationTypeDropdownStore}
									placeholder="BOOKLET.LIST.FILTER.DENOMINATION_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
								<BaasicDropdown
									store={bookletStatusDropdownStore}
									placeholder="BOOKLET.LIST.FILTER.BOOKLET_STATUS_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
								<BaasicDropdown
									store={bookletTypeDropdownStore}
									placeholder="BOOKLET.LIST.FILTER.BOOKLET_TYPE_PLACEHOLDER"
								/>
							</div>
							<div className="col col-sml-12 col-lrg-3 u-mar--bottom--sml">
								<BaasicInput
									id="donorsName"
									className="input input--lrg"
									value={queryUtility.filter.donorsName || ''}
									onChange={event => (queryUtility.filter.donorsName = event.target.value)}
									placeholder="BOOKLET.LIST.FILTER.DONORS_NAME"
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

BookletListTemplate.propTypes = {
	bookletViewStore: PropTypes.object.isRequired,
	t: PropTypes.func,
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
						icon="u-icon u-icon--edit u-icon--base"
						label="BOOKLET.LIST.BUTTON.EDIT"
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
	exportExcel: PropTypes.func,
	codeStart: PropTypes.any,
	codeEnd: PropTypes.any,
	resourcesModel: PropTypes.object
};

export default defaultTemplate(BookletListTemplate);
