import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicDropdown,
    BaasicInput,
    BaasicTableWithRowDetails,
    BasicCheckbox,
    FormatterResolver,
} from 'core/components';
import { isSome } from 'core/utils';
import { ApplicationListLayout, Content } from 'core/layouts';

const DonationReviewTemplate = function ({ donationReviewViewStore, t }) {
    const {
        authorization,
        tableStore,
        onChangeChecked,
        onReviewClick,
        disableSave,
        onPaymentNumberChange,
        paymentNumber,
        paymentTypeDropdownStore,
        onIsTransferToCharityAccountChange,
        isTransferToCharityAccount
    } = donationReviewViewStore;

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
        <ApplicationListLayout store={donationReviewViewStore} authorization={authorization}>
            <Content>
                <div className="row u-mar--bottom--med">
                    <div className="col col-sml-12 u-mar--bottom--sml">
                        <BasicCheckbox
                            id='DONATION.REVIEW.LIST.GRANT.FIELDS.IS_TRANSFER_TO_CHARITY_ACCOUNT'
                            className='input input--med'
                            checked={isTransferToCharityAccount}
                            onChange={onIsTransferToCharityAccountChange}
                            label='DONATION.REVIEW.LIST.GRANT.FIELDS.IS_TRANSFER_TO_CHARITY_ACCOUNT' />
                    </div>
                    {!isTransferToCharityAccount &&
                        <React.Fragment>
                            <div className="col col-sml-12 col-lrg-3">
                                <BaasicInput
                                    id='DONATION.REVIEW.LIST.GRANT.FIELDS.PAYMENT_NUMBER'
                                    className='input input--med'
                                    value={paymentNumber}
                                    onChange={onPaymentNumberChange}
                                    placeholder='DONATION.REVIEW.LIST.GRANT.FIELDS.PAYMENT_NUMBER' />
                                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' && paymentNumber && selectedGrants > 0 &&
                                    <div>
                                        Check Numbers From: {Number(paymentNumber)} to {selectedGrants + Number(paymentNumber) - 1}
                                    </div>}
                            </div>
                            <div className="col col-sml-6 col-lrg-3">
                                <BaasicDropdown store={paymentTypeDropdownStore} />
                            </div>
                        </React.Fragment>}
                </div>
                <div className="card--primary card--med">
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

                <BaasicButton
                    type="button"
                    label='FORM_CONTROLS.SAVE_BUTTON'
                    className='btn btn--sml btn--primary u-mar--right--tny'
                    onClick={onReviewClick}
                    disabled={disableSave}
                    rotate
                />
            </Content>
        </ApplicationListLayout >
    )
};

DonationReviewTemplate.propTypes = {
    donationReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit, onReview } = actions;
    if (!isSome(onEdit, onReview)) return null;

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
        <td className="table__body--data table__body--data--last">
            <div className="table__icons">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONATION.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
                    </BaasicButton>
                ) : null}
                {isSome(onReview) && reviewRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--approve u-icon--sml'
                        label='DONATION.LIST.BUTTON.REVIEW'
                        onlyIcon={true}
                        onClick={() => onReview(item)}>
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

export default defaultTemplate(DonationReviewTemplate);

