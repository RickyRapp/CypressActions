import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    EditFormContent,
    NumberFormatInputField,
    BasicFieldCheckbox,
    DatePickerField,
    NumericInputField,
    FormatterResolver
} from 'core/components';
import { Page } from 'core/layouts';
import {
    CharityAddressListTable,
    CharityBankAccountEdit,
    CharityPageHeaderOverview,
    CharityOnlineAccountPreview
} from 'application/charity/components';
import NumberFormat from 'react-number-format';

const CharityEditTemplate = function ({ charityEditViewStore, t }) {
    const {
        form,
        item,
        loaderStore,
        charityTypeDropdownStore,
        charityStatusDropdownStore,
        charityAccountTypeDropdownStore,
        subscriptionTypeDropdownStore,
        createOnlineAccount,
        formOnlineAccount,
        onBlurUsername,
        charityId
    } = charityEditViewStore;

    return (
        <Page loading={loaderStore.loading} >
            <AuthPageHeader charityId={charityId} type={0} authorization='theDonorsFundAdministrationSection.read' />
            <EditFormContent form={form}>
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <div className="row">
                        <div className="col col-sml-12 col-lrg-12">
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">{t('CHARITY.EDIT.FIELDS.TITLE')}</h3>
                                <div className="form__group__label">{t('CHARITY.EDIT.FIELDS.BALANCE_LABEL')}</div>
                                <span className="input--preview">
                                    {item && <FormatterResolver
                                        item={{ balance: item.balance }}
                                        field='balance'
                                        format={{ type: 'currency' }}
                                    />}
                                </span>
                                <div className="row">
                                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('name')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-6 u-mar--bottom--sml">
                                        <BasicInput field={form.$('dba')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <div>
                                            <label className="form__group__label">Tax Id</label>
                                            {item && <NumberFormat format="##-#######" displayType="text" value={item.taxId} />}
                                        </div>
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityTypeId')} store={charityTypeDropdownStore} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BaasicFieldDropdown field={form.$('charityStatusId')} store={charityStatusDropdownStore} />
                                    </div>
                                </div>
                            </div>
                            <div className="u-mar--bottom--sml">
                                <h3 className="u-mar--bottom--med">Contact info</h3>
                                <div className="row">
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformation.name')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <BasicInput field={form.$('contactInformation.email')} />
                                    </div>
                                    <div className="form__group col col-sml-6 col-lrg-4 u-mar--bottom--sml">
                                        <NumberFormatInputField field={form.$('contactInformation.number')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderEditLayoutFooterContent({ form: form, onSubmit: form.onSubmit })}
                </div>
            </EditFormContent>

            <div className="row">
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    {item && item.coreUser &&
                        <CharityOnlineAccountPreview charityId={charityId} />}
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityBankAccountEdit charityId={charityId} />
                </div>
                <div className="col col-sml-12 col-lrg-12 u-mar--bottom--med">
                    <CharityAddressListTable />
                </div>
            </div>

            {item && !item.coreUser &&
                <div className="card card--form card--primary card--med u-mar--bottom--med">
                    <h3 className="u-mar--bottom--med">
                        Create online account
                        </h3>
                    <EditFormContent form={formOnlineAccount}>
                        <div className="row">
                            <div className="form__group col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown
                                    field={formOnlineAccount.$('charityAccountTypeId')}
                                    store={charityAccountTypeDropdownStore}
                                />
                            </div>
                            <div className="form__group col-lrg-3 u-mar--bottom--sml">
                                <BaasicFieldDropdown
                                    field={formOnlineAccount.$('subscriptionTypeId')}
                                    store={subscriptionTypeDropdownStore}
                                />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <DatePickerField field={formOnlineAccount.$('subscriptionNextDate')} />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <NumericInputField field={formOnlineAccount.$('subscriptionAmount')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form__group col col-lrg-3">
                                <BasicInput field={formOnlineAccount.$('coreUser.username')} onBlur={onBlurUsername} />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <BasicInput field={formOnlineAccount.$('coreUser.coreMembership.password')} />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <BasicInput field={formOnlineAccount.$('coreUser.coreMembership.confirmPassword')} />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <BasicFieldCheckbox field={formOnlineAccount.$('notifyAdministrators')} />
                            </div>
                            <div className="form__group col col-lrg-3">
                                <BasicFieldCheckbox field={formOnlineAccount.$('sendWelcomeEmail')} />
                            </div>
                        </div>

                        {renderEditLayoutFooterContent({ form: formOnlineAccount, onSubmit: createOnlineAccount })}
                    </EditFormContent>
                </div>}
        </Page >
    )
};

const AuthPageHeader = withAuth(CharityPageHeaderOverview);

CharityEditTemplate.propTypes = {
    charityEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form, onSubmit }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any
};

export default defaultTemplate(CharityEditTemplate);
