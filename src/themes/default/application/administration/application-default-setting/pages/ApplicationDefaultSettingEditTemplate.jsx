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
            <div className="row u-mar--bottom--med">
                <div className="col col-sml-12">
                    <div className="card--primary card--med">
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <BasicInput field={form.$('name')} />
                            </div>
                            <div className="col col-lrg-6">
                                <BasicTextArea rows={5} field={form.$('description')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularCertificateDeductionPercentage')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateCertificateDeductionPercentage')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularCertificateFeePercentage')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateCertificateFeePercentage')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularGrantFeePercentage')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateGrantFeePercentage')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularLineOfCreditAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateLineOfCreditAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularMinimumAdditionalContributionAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateMinimumAdditionalContributionAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularMinimumInitialContributionAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateMinimumInitialContributionAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularMinimumGrantAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateMinimumGrantAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('regularNotificationLimitRemainderAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('privateNotificationLimitRemainderAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('blankBookletMaxAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('extraBookletPercentage')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('expressMailFeeAmount')} />
                            </div>
                            <div className="col col-lrg-6">
                                <NumericInputField field={form.$('grantMinimumRegularAmount')} />
                            </div>
                        </div>
                        <div className="row u-mar--bottom--med">
                            <div className="col col-lrg-6">
                                <BaasicFieldDropdown field={form.$('grantAcknowledgmentTypeId')} store={grantAcknowledgmentTypeDropdownStore} />
                            </div>
                            <div className="col col-lrg-6">
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
                className="btn btn--med btn--ghost u-mar--left--sml"
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
