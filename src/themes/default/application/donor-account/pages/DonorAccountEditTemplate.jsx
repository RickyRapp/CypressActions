import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    NumericInputField,
    EditFormContent,
    NumberFormatInputField
} from 'core/components';
import { Page } from 'core/layouts';
import {
    AccountSettingsPartialForm,
    DonorAccountAddressListTable,
    DonorAccountEmailAddressListTable,
    DonorAccountPhoneNumberListTable,
    DonorAccountBankAccountListTable
} from 'application/donor-account/components';
import { DonorAccountPageHeaderOverview } from 'application/donor-account/components';
import { DonorNoteList } from 'application/donor-note/pages';

function DonorAccountEditTemplate({ donorAccountEditViewStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        loaderStore,
        accountSettingsShow,
        onChangeAccountSettingsShow
    } = donorAccountEditViewStore;

    let isPremiumAccount = item && item.accountType.abrv === 'premium';

    return (
        <Page loading={loaderStore.loading} >
            {item && <AuthPageHeader id={item.id} type={0} authorization='theDonorsFundAdministrationSection.read' />}
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
                                        <NumberFormatInputField field={form.$('securityPin')} />
                                    </div>
                                    {isPremiumAccount &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('notificationLimitRemainderAmount')} />
                                        </div>}
                                    {isPremiumAccount &&
                                        <div className="form__group col col-lrg-3">
                                            <NumericInputField field={form.$('blankBookletMaxAmount')} />
                                        </div>}
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                {item &&
                                    <AuthAccountSettingsPartialFormContent
                                        form={form}
                                        isPremiumAccount={isPremiumAccount}
                                        authorization='theDonorsFundAdministrationSection.update'
                                        show={accountSettingsShow}
                                        onChangeShow={onChangeAccountSettingsShow}
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

            {item &&
                <AuthDonorNote
                    id={item.id}
                    authorization='theDonorsFundAdministrationSection.update'
                />}
        </Page >
    )
}

const AuthAccountSettingsPartialFormContent = withAuth(AccountSettingsPartialForm);
const AuthPageHeader = withAuth(DonorAccountPageHeaderOverview);
const AuthDonorNote = withAuth(DonorNoteList);

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
