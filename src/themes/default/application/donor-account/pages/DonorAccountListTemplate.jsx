import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    NullableSwitch,
    BaasicInput
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import _ from 'lodash';

const DonorAccountListTemplate = function ({ donorAccountViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        accountTypes
    } = donorAccountViewStore;

    return (
        <ApplicationListLayout store={donorAccountViewStore} authorization={authorization}>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['firstName'] || ""}
                                onChange={(event) => queryUtility.filter['firstName'] = event.target.value}
                                placeholder='DONOR_ACCOUNT.LIST.FILTER.FIRST_NAME_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['lastName'] || ""}
                                onChange={(event) => queryUtility.filter['lastName'] = event.target.value}
                                placeholder='DONOR_ACCOUNT.LIST.FILTER.LAST_NAME_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-4 col-lrg-3 u-mar--top--sml u-mar--bottom--sml">
                            {accountTypes &&
                                <NullableSwitch
                                    value={!isSome(queryUtility.filter['accountTypeId']) ? null : queryUtility.filter['accountTypeId'] === _.find(accountTypes, { abrv: 'basic' }).id}
                                    onChange={(newValue) => queryUtility.filter['accountTypeId'] = !isSome(newValue) ? null : _.find(accountTypes, { abrv: newValue ? 'basic' : 'premium' }).id}
                                    yesLabel='DONOR_ACCOUNT.LIST.FILTER.BASIC_PLACEHOLDER'
                                    noLabel='DONOR_ACCOUNT.LIST.FILTER.PREMIUM_PLACEHOLDER'
                                />}
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['emails'] || ""}
                                onChange={(event) => queryUtility.filter['emails'] = event.target.value}
                                placeholder='DONOR_ACCOUNT.LIST.FILTER.EMAILS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['accountNumber'] || ""}
                                onChange={(event) => queryUtility.filter['accountNumber'] = event.target.value}
                                placeholder='DONOR_ACCOUNT.LIST.FILTER.ACCOUNT_NUMBER_PLACEHOLDER'
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
    return <EmptyState image={EmptyIcon} title='DONOR_ACCOUNT.LIST.EMPTY_STATE.TITLE' actionLabel='DONOR_ACCOUNT.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
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
                        label='DONOR_ACCOUNT.LIST.BUTTON.EDIT'
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

