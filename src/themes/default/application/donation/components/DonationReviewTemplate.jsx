import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicFormControls,
    BasicInput,
    FormDebug
} from 'core/components';
import { defaultTemplate } from 'core/hoc';

const DonationReviewTemplate = function ({ donationReviewViewStore, t }) {
    const {
        form,
        paymentTypeDropdownStore,
        item,
        donorName
    } = donationReviewViewStore;

    return (
        <section className='w--600--px'>
            <h3 className="u-mar--bottom--med">{t('DONATION.REVIEW.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.CHARITY_NAME_LABEL')}</label>
                    {item &&
                        <span className={"input input--med input--text input--disabled"}>{item.charity.name}</span>}
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.AMOUNT_LABEL')}</label>
                    {item &&
                        <span className={"input input--med input--text input--disabled"}>${item.amount}</span>}
                </div>
                <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                    <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.DONOR_NAME_LABEL')}</label>
                    {donorName &&
                        <span className={"input input--med input--text input--disabled"}>{donorName}</span>}
                </div>
            </div>
            <form className='form'>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('paymentNumber')} />
                    </div>
                    {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'ach' &&
                        <div className="form__group col col-lrg-6">
                            <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.BANK_ACCOUNT_NAME_LABEL')}</label>
                            <span className={"input input--med input--text input--disabled"}>{item.charity.bankAccount.name}</span>
                        </div>}
                </div>
                {paymentTypeDropdownStore.value && paymentTypeDropdownStore.value.abrv === 'check' &&
                    <div className="row">
                        <div className="form__group col col-sml-12 col-lrg-12 u-mar--bottom--sml">
                            <BasicInput field={form.$('attOf')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.addressLine1')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.addressLine2')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.city')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.state')} />
                        </div>
                        <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                            <BasicInput field={form.$('address.zipCode')} />
                        </div>
                    </div>}
                <div className="u-mar--bottom--med">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                </div>
            </form>
            <FormDebug form={form}></FormDebug>
        </section>
    )
};

DonationReviewTemplate.propTypes = {
    donationReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonationReviewTemplate);
