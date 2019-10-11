import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    NumericInputField,
    EditFormContent
} from 'core/components';
import { Page } from 'core/layouts';
import {
    AccountSettingsPartialForm,
    DonorAccountAddressListTable,
    DonorAccountEmailAddressListTable,
    DonorAccountPhoneNumberListTable,
    DonorAccountBankAccountListTable
} from 'application/donor-account/components';

function DonorAccountEditTemplate({ donorAccountEditViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        loaderStore,
        deliveryMethodTypeDropdownStore
    } = donorAccountEditViewStore;

    let isPremiumAccount = false;
    if (item) {
        isPremiumAccount = item.accountType.abrv === 'premium'
    }

    return (
        <Page loading={loaderStore.loading} >
            <div className="card card--form card--primary card--med u-mar--bottom--sml">
                <EditFormContent form={form}>
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">General Data</h3>
                                <div className="row">
                                    <div className="form__group col col-lrg-1">
                                        <BaasicFieldDropdown field={form.$('prefixTypeId')} store={prefixTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('firstName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('middleName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('lastName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BasicInput field={form.$('fundName')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <NumericInputField field={form.$('notificationLimitRemainderAmount')} />
                                    </div>
                                    <div className="form__group col col-lrg-3">
                                        <BaasicFieldDropdown field={form.$('deliveryMethodTypeId')} store={deliveryMethodTypeDropdownStore} />
                                    </div>
                                    {isPremiumAccount &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('blankBookletMax')} />
                                        </div>}
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                {item &&
                                    <AuthAccountSettingsPartialFormContent
                                        form={form}
                                        isPremiumAccount={isPremiumAccount}
                                        authorization='theDonorsFundAdministrationSection.update'
                                    />}
                            </div>
                        </div>
                    </div>

                    {renderEditLayoutFooterContent({ form })}
                </EditFormContent>

                {item &&
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                            <DonorAccountBankAccountListTable />
                        </div>
                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                            <DonorAccountAddressListTable />
                        </div>
                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                            <DonorAccountEmailAddressListTable />
                        </div>
                        <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                            <DonorAccountPhoneNumberListTable />
                        </div>
                    </div>}
            </div>
        </Page >
    )
}

const AuthAccountSettingsPartialFormContent = withAuth(AccountSettingsPartialForm);

DonorAccountEditTemplate.propTypes = {
    donorAccountEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(DonorAccountEditTemplate);
