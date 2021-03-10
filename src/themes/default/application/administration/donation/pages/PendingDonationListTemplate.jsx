import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicFieldDropdown,
    BasicInput,
    BaasicTableWithRowDetails,
    BasicCheckbox,
    FormatterResolver,
    BaasicFormControls
} from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty, isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const PendingDonationListTemplate = function ({ pendingDonationViewStore, t }) {
    const {
        authorization,
        tableStore,
        onChangeChecked,
        paymentTypeDropdownStore,
        achBatchCurrentNumber,
        form,
        onAchNextPaymentNumberClick
    } = pendingDonationViewStore;

    const DetailComponent = ({ dataItem }) => {
        {
            return (
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.CHECKED')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.DONOR_NAME')}</th>
                            <th>{t('DONATION.REVIEW.LIST.GRANT.COLUMNS.CHARITY_AMOUNT')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataItem.pendingDonations.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <BasicCheckbox
                                            id={`${item.id}_${index}`}
                                            checked={item.checked}
                                            onChange={(event) => onChangeChecked(dataItem, item.id, event.target.checked)}
                                            classSuffix=" input--check--nolabel"
                                        />
                                    </td>
                                    <td>{item.donorName}</td>
                                    <td><FormatterResolver
                                        item={{ charityAmount: item.charityAmount }}
                                        field='charityAmount'
                                        format={{ type: 'currency' }}
                                    /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>)
        }
    }

    DetailComponent.propTypes = {
        dataItem: PropTypes.object.isRequired
    };

    const selectedGrants = tableStore.data.filter(c => c.pendingDonations.filter(d => d.checked).length > 0).length;

    return (
        <ApplicationListLayout store={pendingDonationViewStore} authorization={authorization}>
            <Content>
                <div className="row u-mar--bottom--med">
                    <div className="col col-sml-6 col-lrg-3">
                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                    </div>
                    <div className="col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('paymentNumber')} />

                        {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentNumber').value) && selectedGrants > 0 ?
                            <div>
                                Check Numbers From: {Number(form.$('paymentNumber').value)} to {selectedGrants + Number(form.$('paymentNumber').value) - 1}
                            </div>
                            :
                            null}
                        {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                            <div>
                                Next ACH batch number: <span className='btn btn--sml btn--link' onClick={onAchNextPaymentNumberClick}>{achBatchCurrentNumber + 1}</span>
                            </div>}
                    </div>
                </div>
                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="table--dragrow--expandable-row">
                        <BaasicTableWithRowDetails
                            tableStore={tableStore}
                            actionsComponent={renderActions}
                            detailComponent={DetailComponent}
                            loading={tableStore.loading}
                            className="k-grid--actions"
                        />
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            </Content>
        </ApplicationListLayout >
    )
};

PendingDonationListTemplate.propTypes = {
    pendingDonationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    return null;
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any
};

export default defaultTemplate(PendingDonationListTemplate);

