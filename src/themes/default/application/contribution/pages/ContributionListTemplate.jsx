import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicModal,
    BaasicDropdown,
    BaasicInput,
    DateRangeQueryPicker,
    QueryNullableSwitch
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import { ContributionReview } from 'application/contribution/components'
import { SelectDonor } from 'application/donor-account/components';
import _ from 'lodash'

const ContributionListTemplate = function ({ contributionViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectDonorModal,
        searchDonorAccountDropdownStore,
        paymentTypeDropdownStore,
        reviewModal,
        contributionStatusDropdownStore,
        accountTypes,
        dateCreatedDateRangeQueryStore,
        timePeriodDropdownStore
    } = contributionViewStore;

    return (
        <React.Fragment>
            <ApplicationListLayout store={contributionViewStore} authorization={authorization}>
                <Content emptyRenderer={renderEmpty(routes)} >
                    <div className="card--form card--secondary card--med u-mar--bottom--sml">
                        <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown store={searchDonorAccountDropdownStore} />
                            </div>
                            <div className="col col-sml-12 col-med-4 col-lrg-3 u-mar--top--sml u-mar--bottom--sml">
                                {accountTypes &&
                                    <QueryNullableSwitch
                                        queryUtility={queryUtility}
                                        propertyName='accountTypeId'
                                        yesValue={_.find(accountTypes, { abrv: 'basic' }).id}
                                        noValue={_.find(accountTypes, { abrv: 'premium' }).id}
                                        yesLabel='CONTRIBUTION.LIST.FILTER.BASIC_PLACEHOLDER'
                                        noLabel='CONTRIBUTION.LIST.FILTER.PREMIUM_PLACEHOLDER'
                                    />}
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--sml'
                                    value={queryUtility.filter['confirmationNumber'] || ""}
                                    onChange={(event) => queryUtility.filter['confirmationNumber'] = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--sml'
                                    value={queryUtility.filter['paymentNumber'] || ""}
                                    onChange={(event) => queryUtility.filter['paymentNumber'] = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER'
                                />
                            </div>
                            {/* TODO
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputRange
                                    valueMin={queryUtility.filter['amountRangeMin'] || undefined}
                                    valueMax={queryUtility.filter['amountRangeMax'] || undefined}
                                    onChangeMin={(value) => queryUtility.filter['amountRangeMin'] = value}
                                    onChangeMax={(value) => queryUtility.filter['amountRangeMax'] = value}
                                    placeholderMin='CONTRIBUTION.LIST.FILTER.AMOUNT_RANGE_MIN_PLACEHOLDER'
                                    placeholderMax='CONTRIBUTION.LIST.FILTER.AMOUNT_RANGE_MAX_PLACEHOLDER'
                                />
                            </div> */}
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={paymentTypeDropdownStore}
                                    placeholder='CONTRIBUTION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicDropdown
                                    store={contributionStatusDropdownStore}
                                    placeholder='CONTRIBUTION.LIST.FILTER.CONTRIBUTION_STATUS_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <BaasicInput
                                    className='input input--sml'
                                    value={queryUtility.filter['nameOnCheck'] || ""}
                                    onChange={(event) => queryUtility.filter['nameOnCheck'] = event.target.value}
                                    placeholder='CONTRIBUTION.LIST.FILTER.NAME_ON_CHECK_PLACEHOLDER'
                                />
                            </div>
                            <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                                <DateRangeQueryPicker
                                    queryUtility={queryUtility}
                                    store={dateCreatedDateRangeQueryStore}
                                    fromPropertyName='dateCreatedFrom'
                                    toPropertyName='dateCreatedTo'
                                />
                                <BaasicDropdown
                                    store={timePeriodDropdownStore}
                                    placeholder='CONTRIBUTION.LIST.FILTER.CHOOSE_A_TIME_PERIOD_PLACEHOLDER'
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
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
            <BaasicModal modalParams={reviewModal}>
                <ContributionReview />
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='CONTRIBUTION.LIST.EMPTY_STATE.TITLE' actionLabel='CONTRIBUTION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

ContributionListTemplate.propTypes = {
    contributionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit) && !isSome(onReview)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    let reviewRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onReviewRender) {
            reviewRender = actionsRender.onReviewRender(item);
        }
    }

    return (
        <td className="table__body--data right">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        authorization='theDonorsFundAdministrationSection.update'
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='CONTRIBUTION.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item.id)}>
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

export default defaultTemplate(ContributionListTemplate);

