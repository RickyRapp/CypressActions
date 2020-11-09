import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    EmptyState,
    ListContent,
    BaasicInput,
    NumberFormatInput,
    TableFilter,
    BaasicDropdown
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const CharityAdvancedSearchTemplate = function ({ charityAdvancedSearchViewStore }) {
    const {
        tableStore,
        routes,
        authorization,
        queryUtility,
        charityTypeDropdownStore
    } = charityAdvancedSearchViewStore;

    return (
        <ListContent>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter['name'] || ""}
                                onChange={(event) => queryUtility.filter['name'] = event.target.value}
                                placeholder='CHARITY.LIST.FILTER.NAME_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter['dba'] || ""}
                                onChange={(event) => queryUtility.filter['dba'] = event.target.value}
                                placeholder='CHARITY.LIST.FILTER.DBA_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter['emails'] || ""}
                                onChange={(event) => queryUtility.filter['emails'] = event.target.value}
                                placeholder='CHARITY.LIST.FILTER.EMAILS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={charityTypeDropdownStore}
                                placeholder='CHARITY.LIST.FILTER.CHARITY_TYPE_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter['address'] || ""}
                                onChange={(event) => queryUtility.filter['address'] = event.target.value}
                                placeholder='CHARITY.LIST.FILTER.ADDRESS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInput
                                className='input input--med'
                                value={queryUtility.filter['taxId']}
                                onChange={(event) => queryUtility.filter['taxId'] = event.value}
                                format='##-#######'
                            />
                        </div>
                    </TableFilter>
                </div>
                <BaasicTable
                    authorization={authorization}
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
            </Content>
        </ListContent>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='ADDRESS.LIST.EMPTY_STATE.TITLE' actionLabel='ADDRESS.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityAdvancedSearchTemplate.propTypes = {
    charityAdvancedSearchViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions }) {
    if (!isSome(actions)) return null;

    const { onSelect } = actions;
    if (!isSome(onSelect)) return null;

    return (
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onSelect) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--sml' //TODO replace icon with mark primary icon
                        label='CHARITY.LIST.BUTTON.SELECT'
                        onlyIcon={true}
                        onClick={() => onSelect(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object
};

export default defaultTemplate(CharityAdvancedSearchTemplate);

