import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    BasicInput,
    BaasicFieldDropdown,
    NumericInputField,
    BaasicButton
} from 'core/components'
import { PageFooter } from 'core/layouts';

const TestEmailCreateTemplate = function ({ t, testEmailCreateViewStore }) {
    const {
        loaderStore,
        form,
        item,
        needName,
        needAmount,
        needPaymentType,
        needAccountType,
        needDeliveryMethodType,
        needConfirmationNumber,
        paymentTypeDropdownStore,
        accountTypeDropdownStore,
        deliveryMethodTypeDropdownStore,
        setAllCustom
    } = testEmailCreateViewStore;

    return (
        <section>
            <EditFormContent form={form}
                emptyRenderer={<ApplicationEmptyState />}
                loading={loaderStore.loading}
            >
                <h5 className="type--lrg type--wgt--bold u-mar--bottom--sml">{t('TEST.TEST_EMAIL.CREATE.TITLE')}</h5>
                <h3 className=" type--color--note u-mar--bottom--tny">{item.name}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-12">
                        <BasicInput field={form.$('email')} />
                        <BaasicButton
                            className="btn btn--tny btn--primary u-display--b u-mar--top--tny u-mar--bottom--nano"
                            label={'jperak@mono.hr'}
                            onClick={() => form.$('email').set('jperak@mono.hr')}
                        />
                        <BaasicButton
                            className="btn btn--tny btn--primary u-display--b u-mar--bottom--nano"
                            label={'aronschlesinger@gmail.com'}
                            onClick={() => form.$('email').set('aronschlesinger@gmail.com')}
                        />
                    </div>

                    {needName &&
                        <div className="form__group col col-lrg-12">
                            <BasicInput field={form.$('name')} />
                        </div>}
                    {needAmount &&
                        <div className="form__group col col-lrg-12">
                            <NumericInputField field={form.$('amount')} />
                        </div>}
                    {needPaymentType &&
                        <div className="form__group col col-lrg-12">
                            <BaasicFieldDropdown field={form.$('paymentTypeId')} store={paymentTypeDropdownStore} />
                        </div>}
                    {needAccountType &&
                        <div className="form__group col col-lrg-12">
                            <BaasicFieldDropdown field={form.$('accountTypeId')} store={accountTypeDropdownStore} />
                        </div>}
                    {needDeliveryMethodType &&
                        <div className="form__group col col-lrg-12">
                            <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />
                        </div>}
                    {needConfirmationNumber &&
                        <div className="form__group col col-lrg-12">
                            <BasicInput field={form.$('confirmationNumber')} />
                        </div>}
                </div>
            </EditFormContent>
            <PageFooter>
                <div className="u-display--flex u-push">
                    <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                    <div className="u-mar--left--sml">
                        <BaasicButton
                            className="btn btn--med btn--med--wide btn--ghost"
                            label='Set all custom data'
                            onClick={setAllCustom}
                            />
                    </div>
                </div>
            </PageFooter>
        </section>
    )
}

TestEmailCreateTemplate.propTypes = {
    testEmailCreateViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(TestEmailCreateTemplate);
