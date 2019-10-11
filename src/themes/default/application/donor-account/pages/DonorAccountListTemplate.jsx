import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton, BaasicTable, TableFilter, EmptyState, QueryNullableSwitch } from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { SearchFilter } from 'core/components';

const DonorAccountListTemplate = function ({ donorAccountViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization
    } = donorAccountViewStore;

    return (
        <ApplicationListLayout store={donorAccountViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} >
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <SearchFilter
                                className='input input--sml input--search'
                                queryUtility={queryUtility}
                                propertyName='firstName'
                                placeholder="First Name"
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <SearchFilter
                                className='input input--sml input--search'
                                queryUtility={queryUtility}
                                propertyName='lastName'
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <SearchFilter
                                className='input input--sml input--search'
                                queryUtility={queryUtility}
                                propertyName='emails'
                                placeholder="Emails"
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-2 u-mar--bottom--sml">
                            <QueryNullableSwitch
                                queryUtility={queryUtility}
                                propertyName='accountTypeId'
                            />
                        </div>
                    </TableFilter>
                </div>
                <div className="card--form card--primary card--med">
                    <BaasicTable
                        authorization={authorization}
                        tableStore={tableStore}
                        actionsComponent={renderActions}
                    />
                </div>
            </Content>
        </ApplicationListLayout>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='DONORACCOUNT.LIST.EMPTY_STATE.TITLE' actionLabel='DONORACCOUNT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

DonorAccountListTemplate.propTypes = {
    donorAccountViewStore: PropTypes.object.isRequired
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
                        label='DONORACCOUNT.LIST.BUTTON.EDIT'
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

export default defaultTemplate(DonorAccountListTemplate);

