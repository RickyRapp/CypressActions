import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    ApplicationEmptyState,
    EditFormContent,
    BaasicFormControls,
    NumericInputField,
    BasicFieldCheckbox
} from 'core/components'

const DonorCertificateSettingTemplate = function ({ donorAccountSettingViewStore }) {
    const {
        loaderStore,
        form
    } = donorAccountSettingViewStore;

    return (
        <EditFormContent form={form}
            emptyRenderer={<ApplicationEmptyState />}
            loading={loaderStore.loading}
        >
            <h3 className="u-mar--bottom--med">Account settings</h3>
            <div className="row">
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('lineOfCredit')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('certificateDeductionPercentage')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('certificateFeePercentage')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('contributionMinimumAdditionalAmount')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('contributionMinimumInitialAmount')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('grantFeePercentage')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('grantMinimumAmount')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('extraBookletPercentage')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('blankBookletMaxAmount')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <NumericInputField field={form.$('notificationLimitRemainderAmount')} />
                </div>
                <div className="form__group col col-lrg-3">
                    <BasicFieldCheckbox field={form.$('isInitialContributionDone')} />
                </div>
            </div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} disableSave={form.$('lineOfCredit').disabled} />
        </EditFormContent>
    )
}

DonorCertificateSettingTemplate.propTypes = {
    donorAccountSettingViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(DonorCertificateSettingTemplate);
