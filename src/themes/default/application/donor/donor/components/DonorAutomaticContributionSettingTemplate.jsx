import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    EditFormContent,
    BaasicFormControls,
    BasicFieldCheckbox,
    BaasicFieldDropdown,
    NumericInputField,
    FormatterResolver,
    BaasicButton
} from 'core/components'

const DonorAutomaticContributionSettingTemplate = function ({ t, donorAutomaticContributionSettingViewStore }) {
    const {
        loaderStore,
        form,
        bankAccountDropdownStore,
        onEnableEditClick,
        onChangeIsEnabled,
        isEditEnabled,
        item
    } = donorAutomaticContributionSettingViewStore;

    return (
        <React.Fragment>
            <div className="row u-mar--bottom--sml">
                <div className="col col-sml-12 col-lrg-3">
                    <h3 className="type--lrg type--wgt--medium u-mar--bottom--med">
                        {t('DONOR.AUTOMATIC_CONTRIBUTION_SETTING.TITLE')}
                    </h3>
                </div>
                {isEditEnabled ?
                    <React.Fragment>
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="card--med card--primary">
                                <EditFormContent form={form} loading={loaderStore.loading}>
                                    <div className="row">
                                        <div className="form__group col col-sml-12 col-lrg-4">
                                            <BasicFieldCheckbox field={form.$('isEnabled')} onChange={onChangeIsEnabled} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form__group col col-sml-12 col-lrg-4">
                                            <BaasicFieldDropdown field={form.$('donorBankAccountId')} store={bankAccountDropdownStore} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-4">
                                            <NumericInputField field={form.$('amount')} />
                                        </div>
                                        <div className="form__group col col-sml-12 col-lrg-4">
                                            <NumericInputField field={form.$('lowBalanceAmount')} />
                                        </div>
                                    </div>
                                    <div className="type--right">
                                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                                        <BaasicButton
                                            type="button"
                                            className="btn btn--med btn--med--wide btn--ghost u-mar--left--sml"
                                            onClick={onEnableEditClick}
                                            label="Cancel"
                                        />
                                    </div>
                                </EditFormContent>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="col col-sml-12 col-lrg-9">
                            <div className="row scale u-mar--bottom--sml" title="Click to edit" onClick={onEnableEditClick}>
                                <div className="form__group col col-sml-12 col-xlrg-3 col-xxlrg-3">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Enabled?</p>
                                    <p className="type--base type--wgt--medium">
                                        {item && item.isEnabled ? 'Yes' : 'No'}
                                    </p>
                                </div>

                                <div className="form__group col col-sml-12 col-xlrg-3 col-xxlrg-3">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Bank Account:</p>
                                    <p className="type--base type--wgt--medium">
                                        {item && item.donorBankAccount && item.donorBankAccount.name}
                                    </p>
                                </div>

                                <div className="form__group col col-sml-12 col-xlrg-3 col-xxlrg-3">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Amount:</p>
                                    <p className="type--base type--wgt--medium">
                                        <FormatterResolver
                                            item={{ amount: item && item.amount }}
                                            field='amount'
                                            format={{ type: 'currency' }}
                                        />
                                    </p>
                                </div>

                                <div className="form__group col col-sml-12 col-xlrg-3 col-xxlrg-3">
                                    <p className="type--sml type--wgt--regular type--color--opaque u-mar--bottom--sml">Low Balance Amount:</p>
                                    <p className="type--base type--wgt--medium">
                                        <FormatterResolver
                                            item={{ lowBalanceAmount: item && item.lowBalanceAmount }}
                                            field='lowBalanceAmount'
                                            format={{ type: 'currency' }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>}
            </div>
        </React.Fragment>
    )
}

DonorAutomaticContributionSettingTemplate.propTypes = {
    donorAutomaticContributionSettingViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(DonorAutomaticContributionSettingTemplate);
