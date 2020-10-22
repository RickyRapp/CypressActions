import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicDropdown,
    BaasicInput,
    DateRangeQueryPicker
} from 'core/components';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const BookletOrderListTemplate = function ({ bookletOrderViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        deliveryMethodTypeDropdownStore,
        bookletOrderStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = bookletOrderViewStore;

    return (
        <Content >
            <div className="card--form card--secondary card--med u-mar--bottom--sml">
                <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
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
    )
};

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

