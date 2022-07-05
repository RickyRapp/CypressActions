import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFieldDropdown,
    BasicInput,
    BaasicTableWithRowDetails,
    BasicCheckbox,
    FormatterResolver,
    BaasicFormControls,
    DatePickerField,
    BaasicButton,
    BaasicModal
} from 'core/components';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';
import _ from 'lodash';
import { DonationLog } from 'application/administration/donation/pages';

const PendingDonationListTemplate = function ({ pendingDonationViewStore, t }) {
    const {
        authorization,
        tableStore,
        onChangeChecked,
        paymentTypeDropdownStore,
        achBatchCurrentNumber,
        form,
        onAchNextPaymentNumberClick,
        getPendingDonations,
        disableSave,
        loaderStore,
        openDonationLogModalClick,
        donationLogModalParams
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
                        {dataItem && dataItem.pendingDonations && dataItem.pendingDonations.map((item, index) => {
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
                                    <td>{item.isWithdraw ? "Withdraw transaction" : item.name}</td>
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

    const selectedGrants = 0;
    return (
        <ApplicationListLayout store={pendingDonationViewStore} authorization={authorization} loading={loaderStore.loading}>
            <Content>
                <div className="row u-mar--bottom--med">
                    <div className="col col-sml-6 col-lrg-3">
                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                    </div>

                    <div className="col col-sml-12 col-lrg-3">
                        <BasicInput field={form.$('paymentNumber')} />

                        {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' && !isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentNumber').value) && tableStore && tableStore.selectedItems && tableStore.selectedItems.length > 0 ?
                            <div>
                                Check Numbers From: {form.$('paymentNumber').value} to {tableStore.selectedItems.length + Number(form.$('paymentNumber').value) - 1}
                            </div>
                            :
                            null}
                        {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                            <div>
                                Next ACH batch number: <span className='btn btn--sml btn--link' onClick={onAchNextPaymentNumberClick}>{achBatchCurrentNumber + 1}</span>
                            </div>}
                        {!isNullOrWhiteSpacesOrUndefinedOrEmpty(form.$('paymentTypeId').value) && paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'charity-account' &&
                        <div>
                            Next charity account transfer number: <span className='btn btn--sml btn--link' onClick={onAchNextPaymentNumberClick}>CA-{achBatchCurrentNumber + 1}</span>
                        </div>}
                    </div>

                    <div className="col col-sml-6 col-lrg-3">
                        <DatePickerField field={form.$('paymentDate')} />
                    </div>
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    
                </div>

                <div className="row u-mar--bottom--med">
                    <div className="col col-sml-6 col-lrg-3">
                        <BaasicButton
                            className="btn btn--med btn--ghost search__wrapper__item"
                            label="DONATION_REVIEW.TITLE"
                            onClick={openDonationLogModalClick}
                        />
                    </div>
                </div>

                <div className="card--primary card--med u-mar--bottom--med">
                    <div className="table--dragrow--expandable-row">
                        <BaasicTableWithRowDetails
                            tableStore={tableStore}
                            detailComponent={DetailComponent}
                            loading={tableStore.loading}
                            className="k-grid--actions"
                        />
                    </div>
                </div>

                <BaasicFormControls form={form} onSubmit={form.onSubmit} disableSave={disableSave} />
            </Content>

            <BaasicModal modalParams={donationLogModalParams}>
                <DonationLog />
            </BaasicModal>

        </ApplicationListLayout >
    )
};

PendingDonationListTemplate.propTypes = {
    pendingDonationViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(PendingDonationListTemplate);

