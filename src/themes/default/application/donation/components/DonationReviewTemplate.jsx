import React from 'react';
import PropTypes from 'prop-types';
import {
    BaasicFieldDropdown,
    BaasicFormControls,
    BasicInput,
    FormatterResolver
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import _ from 'lodash';

const DonationReviewTemplate = function ({ donationReviewViewStore, t, selectedItems }) {
    const {
        form,
        paymentTypeDropdownStore,
        charity
    } = donationReviewViewStore;

    form.$('donationIds').set(selectedItems.map(c => c.id).join(', '));

    return (
        <section className='w--600--px'>
            <h3 className="u-mar--bottom--med">{t('DONATION.REVIEW.TITLE')}</h3>
            <div className="row">
                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                    <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.CHARITY_NAME_LABEL')}</label>
                    <span className={"input input--med input--text input--disabled"}>{charity.name}</span>
                </div>
                <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                    <label className="form__group__label">{t('DONATION.REVIEW.FIELDS.AMOUNT_LABEL')}</label>
                    <span className={"input input--med input--text input--disabled"}>
                        <FormatterResolver
                            item={{ totalAmount: _.sumBy(selectedItems, 'amount') }}
                            field='totalAmount'
                            format={{ type: 'currency' }}
                        />
                    </span>
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
                            <span className={"input input--med input--text input--disabled"}>{charity.bankAccount.name}</span>
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
                    {selectedItems.length > 0 &&
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />}
                </div>
            </form>
        </section>
    )
};

DonationReviewTemplate.propTypes = {
    donationReviewViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonationReviewTemplate);
