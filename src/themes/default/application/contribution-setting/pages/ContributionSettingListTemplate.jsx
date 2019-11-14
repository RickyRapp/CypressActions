import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown,
    DateRangeQueryPicker
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const ContributionSettingListTemplate = function ({ contributionSettingViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        searchDonorAccountDropdownStore,
        contributionSettingTypeDropdownStore,
        dateCreatedDateRangeQueryStore
    } = contributionSettingViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={contributionSettingViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchDonorAccountDropdownStore} />
                            </div>
                            {/* TODO
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputRange
                                    valueMin={queryUtility.filter['amountRangeMin'] || undefined}
                                    valueMax={queryUtility.filter['amountRangeMax'] || undefined}
                                    onChangeMin={(value) => queryUtility.filter['amountRangeMin'] = value}
                                    onChangeMax={(value) => queryUtility.filter['amountRangeMax'] = value}
                                    placeholderMin='CONTRIBUTION_SETTING.LIST.FILTER.AMOUNT_RANGE_MIN_PLACEHOLDER'
                                    placeholderMax='CONTRIBUTION_SETTING.LIST.FILTER.AMOUNT_RANGE_MAX_PLACEHOLDER'
                                />
                            </div> */}
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={contributionSettingTypeDropdownStore}
                                    placeholder='CONTRIBUTION_SETTING.LIST.FILTER.CONTRIBUTION_SETTING_TYPE_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <DateRangeQueryPicker
                                    queryUtility={queryUtility}
                                    store={dateCreatedDateRangeQueryStore}
                                    fromPropertyName='dateCreatedFrom'
                                    toPropertyName='dateCreatedTo'
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
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CONTRIBUTION_SETTING.LIST.EMPTY_STATE.TITLE' actionLabel='CONTRIBUTION_SETTING.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ContributionSettingListTemplate.propTypes = {
    contributionSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onCancel } = actions;
    if (!isSome(onEdit) && !isSome(onCancel)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let cancelRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onCancelRender) {
            cancelRender = actionsRender.onCancelRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CONTRIBUTION_SETTING.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--unapproved u-icon--sml'
                        label='CONTRIBUTION_SETTING.LIST.BUTTON.CANCEL'
                        onlyIcon={true}
                        onClick={() => onCancel(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(ContributionSettingListTemplate);

