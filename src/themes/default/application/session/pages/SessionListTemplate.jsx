import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    TableFilter,
    BaasicModal,
    EmptyState,
    BaasicDropdown,
    BaasicInput,
    NumberFormatInput,
    DateRangeQueryPicker
} from 'core/components';
import EmptyIcon from 'themes/assets/img/building-modern.svg';
import { isSome } from 'core/utils';
import { Content } from 'core/layouts';

const SessionListTemplate = function ({ sessionViewStore, t }) {
    const {
        tableStore,
        routes,
        queryUtility,
        authorization,
        selectScannerModal,
        scannerDropdownStore,
        setScannerConnection,
        searchCharityDropdownStore,
        paymentTypeDropdownStore,
        donationStatusDropdownStore,
        dateCreatedDateRangeQueryStore
    } = sessionViewStore;

    return (
        <React.Fragment>
            <Content emptyRenderer={renderEmpty(routes)} >
                <div className="card--form card--secondary card--med u-mar--bottom--sml">
                    <TableFilter queryUtility={queryUtility} showDefaultSearchFilter={false}>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown store={searchCharityDropdownStore} />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['confirmationNumber'] || ""}
                                onChange={(event) => queryUtility.filter['confirmationNumber'] = event.target.value}
                                placeholder='SESSION.LIST.FILTER.CONFIRMATION_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicInput
                                className='input input--sml'
                                value={queryUtility.filter['paymentNumber'] || ""}
                                onChange={(event) => queryUtility.filter['paymentNumber'] = event.target.value}
                                placeholder='SESSION.LIST.FILTER.PAYMENT_NUMBER_PLACEHOLDER'
                            />
                        </div>
                        {/* TODO
                            <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                                <NumericInputRange
                                    valueMin={queryUtility.filter['amountRangeMin'] || undefined}
                                    valueMax={queryUtility.filter['amountRangeMax'] || undefined}
                                    onChangeMin={(value) => queryUtility.filter['amountRangeMin'] = value}
                                    onChangeMax={(value) => queryUtility.filter['amountRangeMax'] = value}
                                    placeholderMin='SESSION.LIST.FILTER.AMOUNT_RANGE_MIN_PLACEHOLDER'
                                    placeholderMax='SESSION.LIST.FILTER.AMOUNT_RANGE_MAX_PLACEHOLDER'
                                />
                            </div> */}
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={paymentTypeDropdownStore}
                                placeholder='SESSION.LIST.FILTER.PAYMENT_TYPE_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <BaasicDropdown
                                store={donationStatusDropdownStore}
                                placeholder='SESSION.LIST.FILTER.SESSION_STATUS_PLACEHOLDER'
                            />
                        </div>
                        <div className="col col-sml-12 col-med-6 col-lrg-3 u-mar--bottom--sml">
                            <NumberFormatInput
                                className='input input--sml'
                                value={queryUtility.filter['bookletCertificateCode']}
                                onChange={(event) => queryUtility.filter['bookletCertificateCode'] = event.formattedValue}
                                format='#####-##'
                                mask=''
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
            <BaasicModal modalParams={selectScannerModal}>
                <section>
                    <h3 className="u-mar--bottom--med">{t('SESSION.LIST.SELECT_SCANNER')}</h3>
                    <div className="row">
                        <div className="form__group col col-lrg-12">
                            <BaasicDropdown store={scannerDropdownStore} />
                            <BaasicButton
                                className="btn btn--primary"
                                label='SESSION.LIST.BUTTON.SKIP_TO_CREATE_PAGE'
                                onClick={() => setScannerConnection()}>
                            </BaasicButton>
                        </div>
                    </div>
                </section>
            </BaasicModal>
        </React.Fragment>
    )
};

function renderEmpty(routes) {
    return <EmptyState image={EmptyIcon} title='SESSION.LIST.EMPTY_STATE.TITLE' actionLabel='SESSION.LIST.EMPTY_STATE.ACTION' callToAction={routes.create} />
}

SessionListTemplate.propTypes = {
    sessionViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
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

