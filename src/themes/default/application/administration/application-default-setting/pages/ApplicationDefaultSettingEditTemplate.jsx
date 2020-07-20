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
                                <NumericInputField field={form.$('regularCertificateDeductionPercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateCertificateDeductionPercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularCertificateFeePercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateCertificateFeePercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularGrantFeePercentage')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateGrantFeePercentage')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularLineOfCreditAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateLineOfCreditAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularMinimumAdditionalContributionAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateMinimumAdditionalContributionAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularMinimumInitialContributionAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateMinimumInitialContributionAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularMinimumGrantAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateMinimumGrantAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('regularNotificationLimitRemainderAmount')} />
                            </div>
                            <div className="form__group col col-lrg-6 u-mar--bottom--sml">
                                <NumericInputField field={form.$('privateNotificationLimitRemainderAmount')} />
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
