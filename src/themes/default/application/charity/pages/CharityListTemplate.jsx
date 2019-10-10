import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { SearchFilter } from 'core/components';

const CharityListTemplate = function ({ charityViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = charityViewStore;

    return (
        <ApplicationListLayout store={charityViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="spc--bottom--sml">
                    <TableFilter queryUtility={queryUtility} >
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <SearchFilter
                                className='input input--sml input--search'
                                queryUtility={queryUtility}
                                propertyName='name'
                                placeholder="Name"
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <SearchFilter
                                className='input input--sml input--search'
                                queryUtility={queryUtility}
                                propertyName='taxId'
                                placeholder="Tax Id"
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
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CHARITY.LIST.EMPTY_STATE.TITLE' actionLabel='CHARITY.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

CharityListTemplate.propTypes = {
    charityViewStore: PropTypes.object.isRequired
};

function renderActions({ item, actions, authorization }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) ? (
                    <BaasicButton
                        authorization={authorization ? authorization.update : null}
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CHARITY.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(CharityListTemplate);

