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
import { ApplicationListLayout, Content, PageHeader } from 'core/layouts';

const BookletOrderListTemplate = function ({ bookletOrderViewStore }) {
    const {
        routes,
        tableStore,
        queryUtility,
        authorization,
        deliveryMethodTypeDropdownStore,
        bookletOrderStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = bookletOrderViewStore;

    return (
        <ApplicationListLayout store={bookletOrderViewStore} authorization={authorization}>
            <PageHeader routes={routes}></PageHeader>
            <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} visibleByDefault={false}>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                id='bookletCodes'
                                className='input input--lrg'
                                value={queryUtility.filter.bookletCodes || ""}
                                onChange={(event) => queryUtility.filter.bookletCodes = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.BOOKLET_CODES_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                id='confirmationNumber'
                                className='input input--lrg'
                                value={queryUtility.filter.confirmationNumber || ""}
                                onChange={(event) => queryUtility.filter.confirmationNumber = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                id='trackingNumber'
                                className='input input--lrg'
                                value={queryUtility.filter.trackingNumber || ""}
                                onChange={(event) => queryUtility.filter.trackingNumber = event.target.value}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.TRACKING_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={deliveryMethodTypeDropdownStore}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.DELIVERY_TYPE_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={bookletOrderStatusDropdownStore}
                                placeholder='BOOKLET_ORDER.LIST.FILTER.BOOKLET_ORDER_STATUS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <div className="row row--form">
                                <div className="col col-sml-8">
                                    <DateRangeQueryPicker
                                        queryUtility={queryUtility}
                                        store={dateCreatedDateRangeQueryStore}
                                        fromPropertyName='dateCreatedFrom'
                                        toPropertyName='dateCreatedTo'
                                    />
                                </div>
                            </div>
                        </div>
                    </TableFilter>
                </div>
                <div className="card--primary card--med">
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

BookletOrderListTemplate.propTypes = {
    bookletOrderViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onDetails, onCancel } = actions;
    if (!isSome(onDetails)) return null;

    let detailsRender = true;
	if (isSome(actionsRender)) {
		if (actionsRender.onDetailsRender) {
			detailsRender = actionsRender.onDetailsRender(item);
		}
	}
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
        <td>
            <div className="type--right">
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon="u-icon u-icon--cancel u-icon--base u-mar--right--tny"
                        label="BOOKLET_ORDER.LIST.BUTTON.CANCEL"
                        onlyIcon={true}
                        onClick={() => onCancel(item)}
                    ></BaasicButton>
                ) : null
                }
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--base'
                        label='BOOKLET_ORDER.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onDetails) && detailsRender ? ( 
					<BaasicButton
						className="btn btn--icon"
						icon="u-icon u-icon--preview u-icon--base"
						label="BOOKLET_ORDER.LIST.BUTTON.PREVIEW"
						onlyIcon={true}
						onClick={() => onDetails(item.id)}
					></BaasicButton>
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

