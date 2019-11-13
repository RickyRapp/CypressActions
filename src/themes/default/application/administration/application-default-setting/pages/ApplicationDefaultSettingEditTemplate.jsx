import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFormControls,
    BaasicButton,
    ApplicationEmptyState,
    BasicTextArea,
    NumericInputField,
    BaasicFieldDropdown
} from 'core/components';
import { PageFooter, EditFormLayout } from 'core/layouts';

function ApplicationDefaultSettingEditTemplate({ applicationDefaultSettingEditViewStore, t }) {
    const {
        form,
        rootStore,
        loaderStore,
        deliveryMethodTypeDropdownStore,
        grantAcknowledgmentTypeDropdownStore,
        grantPurposeTypeDropdownStore
    } = applicationDefaultSettingEditViewStore;

    return (
        <EditFormLayout store={applicationDefaultSettingEditViewStore} emptyRenderer={<ApplicationEmptyState />} loading={loaderStore.loading}>
            <div className="row">
                <div className="col col-sml-12 col-lrg-8">
                    <div className="card card--form card--primary card--med">
                        <div className="row">
                            <div className="form__group col col-lrg-12 u-mar--bottom--sml">
                                <BasicInput field={form.$('name')} />
                            </div>
                            <div className="form__group col col-lrg-12 u-mar--bottom--sml">
                                <BasicTextArea rows={5} field={form.$('description')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicCertificateDeductionPercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumCertificateDeductionPercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicCertificateFeePercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumCertificateFeePercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicGrantFeePercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumGrantFeePercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicLineOfCreditAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumLineOfCreditAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicMinimumAdditionalContributionAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumMinimumAdditionalContributionAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicMinimumInitialContributionAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumMinimumInitialContributionAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicMinimumGrantAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumMinimumGrantAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('basicNotificationLimitRemainderAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('premiumNotificationLimitRemainderAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('blankBookletMaxAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('extraBookletPercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('expressMailFeeAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('grantMinimumRegularAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <BaasicFieldDropdown field={form.$('grantPurposeTypeId')} store={grantPurposeTypeDropdownStore} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {renderEditLayoutFooterContent({
                form,
                t,
                goBack: () => rootStore.routerStore.goBack()
            })}
        </EditFormLayout>
    )
}

ApplicationDefaultSettingEditTemplate.propTypes = {
    applicationDefaultSettingEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form, goBack, t }) {
    return <PageFooter>
        <div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            <BaasicButton
                className="btn btn--base btn--ghost"
                label={t('EDIT_FORM_LAYOUT.CANCEL')}
                onClick={goBack}
            />
        </div>
    </PageFooter>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    goBack: PropTypes.func,
    t: PropTypes.func
};

export default defaultTemplate(ApplicationDefaultSettingEditTemplate);
