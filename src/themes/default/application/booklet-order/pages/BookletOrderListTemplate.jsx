import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    EmptyState,
    BaasicDropdown,
    BaasicInput,
    DateRangeQueryPicker,
    BaasicModal
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';
import { SelectDonor } from 'application/donor-account/components';

const BookletOrderListTemplate = function ({ bookletOrderViewStore }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectDonorModal,
        searchDonorAccountDropdownStore,
        deliveryMethodTypeDropdownStore,
        bookletOrderStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = bookletOrderViewStore;

    return (
        <React.Fragment>
            <BaasicButton
                className="btn btn--base btn--primary"
                label={'LIST_LAYOUT.CREATE_BUTTON'}
                onClick={routes.create} />
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                        <AuthDropdown
                            searchDonorAccountDropdownStore={searchDonorAccountDropdownStore}
                            authorization='theDonorsFundAdministrationSection.read' />

                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['bookletCodes'] || ""}
                                onChange={(event) => queryUtility.filter['bookletCodes'] = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.BOOKLET_CODES_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['confirmationNumber'] || ""}
                                onChange={(event) => queryUtility.filter['confirmationNumber'] = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['trackingNumber'] || ""}
                                onChange={(event) => queryUtility.filter['trackingNumber'] = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.TRACKING_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        {/* TODO
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputRange
                                    valueMin={queryUtility.filter['amountRangeMin'] || undefined}
                                    valueMax={queryUtility.filter['amountRangeMax'] || undefined}
                                    onChangeMin={(value) => queryUtility.filter['amountRangeMin'] = value}
                                    onChangeMax={(value) => queryUtility.filter['amountRangeMax'] = value}
                                    placeholderMin='BOOKLET_ORDER.LIST.FILTER.AMOUNT_RANGE_MIN_PLACEHOLDER'
                                    placeholderMax='BOOKLET_ORDER.LIST.FILTER.AMOUNT_RANGE_MAX_PLACEHOLDER'
                                />
                            </div> */}
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={deliveryMethodTypeDropdownStore}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.DELIVERY_TYPE_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={bookletOrderStatusDropdownStore}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.BOOKLET_ORDER_STATUS_PLACEHOLDER'
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
            <BaasicModal modalParams={selectDonorModal}>
                <SelectDonor />
            </BaasicModal>
        </React.Fragment>
    )
};

const AuthDropdown = withAuth(DropdownComponent);

function DropdownComponent({ searchDonorAccountDropdownStore }) {
    return (
        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
            <BaasicDropdown store={searchDonorAccountDropdownStore} />
        </div>
    );
}

DropdownComponent.propTypes = {
    searchDonorAccountDropdownStore: PropTypes.object.isRequired
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='BOOKLET_ORDER.LIST.EMPTY_STATE.TITLE' actionLabel='BOOKLET_ORDER.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

BookletOrderListTemplate.propTypes = {
    bookletOrderViewStore: PropTypes.object.isRequired,
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
                        label='BOOKLET_ORDER.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        authorization='theDonorsFundAdministrationSection.update'
                        className="btn btn--icon"
                        icon='u-icon u-icon--approved u-icon--sml'
                        label='BOOKLET_ORDER.LIST.BUTTON.REVIEW'
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

export default defaultTemplate(BookletOrderListTemplate);

