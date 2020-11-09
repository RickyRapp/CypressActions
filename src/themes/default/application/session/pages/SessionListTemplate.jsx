import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicDropdown,
    BaasicInput,
    NumberFormatInput,
    DateRangeQueryPicker
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const SessionListTemplate = function ({ sessionViewStore }) {
    const {
        tableStore,
        queryUtility,
        authorization,
        searchCharityDropdownStore,
        paymentTypeDropdownStore,
        donationStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = sessionViewStore;

    return (
        <ApplicationListLayout store={sessionViewStore} authorization={authorization}>
            <Content>
                <div className="card--tertiary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} >
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown store={searchCharityDropdownStore} />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter.confirmationNumber || ""}
                                onChange={(event) => queryUtility.filter.confirmationNumber = event.target.value}
                                placeholder='SESSION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--med'
                                value={queryUtility.filter.paymentNumber || ""}
                                onChange={(event) => queryUtility.filter.paymentNumber = event.target.value}
                                placeholder='SESSION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={paymentTypeDropdownStore}
                                placeholder='SESSION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={donationStatusDropdownStore}
                                placeholder='SESSION.LIST.FILTER.SESSION_STATUS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-4 u-mar--bottom--sml">
                            <NumberFormatInput
                                className='input input--med'
                                value={queryUtility.filter.bookletCertificateCode}
                                onChange={(event) => queryUtility.filter.bookletCertificateCode = event.formattedValue}
                                format='#####-##'
                                mask=''
                            />
                        </div>
                        <div className="col col-sml-12 u-mar--bottom--sml">
                            <div className="row">
                                <div className="col col-sml-12 col-lrg-8">
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

SessionListTemplate.propTypes = {
    sessionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onCancel, onPreview } = actions;
    if (!isSome(onEdit) && !isSome(onCancel) && !isSome(onPreview)) return null;

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
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='SESSION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onCancel) && cancelRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--close u-icon--sml'
                        label='SESSION.LIST.BUTTON.CANCEL'
                        onlyIcon={true}
                        onClick={() => onCancel(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onPreview) ? (
                    <BaasicButton
                        authorization='theDonorsFundSessionSection.read'
                        className="btn btn--icon"
                        icon='u-icon u-icon--preview u-icon--sml'
                        label='SESSION.LIST.BUTTON.PREVIEW'
                        onlyIcon={true}
                        onClick={() => onPreview(item)}>
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

export default defaultTemplate(SessionListTemplate);

