import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate, withAuth } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicFormControls,
    NumericInputField,
    EditFormContent,
    NumberFormatInputField,
    Date
} from 'core/components';
import { AccountSettingsPartialForm, AccountSettingsPreview } from 'application/donor-account/components';

function DonorAccountGeneralDataTemplate({ donorAccountGeneralDataEditViewStore, rootStore }) {
    const {
        form,
        prefixTypeDropdownStore,
        item,
        accountSettingsShow,
        onChangeAccountSettingsShow
    } = donorAccountGeneralDataEditViewStore;

    const {
        permissionStore
    } = rootStore;

    let isPremiumAccount = item && item.accountType.abrv === 'premium';

    return (
        <div className="card--form card--primary card--med">
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
                                    <div>
                                        <label className="form__group__label">Date of birth</label>
                                        {item &&
                                            <span className={"input input--med input--text input--disabled"}>
                                                <Date format="full-date" value={item.dateOfBirth} />
                                            </span>}
                                    </div>
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
                                <React.Fragment>
                                    {permissionStore.hasPermission('theDonorsFundAdministrationSection.update') ?
                                        <AccountSettingsPartialForm
                                            form={form}
                                            isPremiumAccount={isPremiumAccount}
                                            show={accountSettingsShow}
                                            onChangeShow={onChangeAccountSettingsShow}
                                        />
                                        :
                                        <AccountSettingsPreview
                                            item={item}
                                            isPremiumAccount={isPremiumAccount}
                                        />
                                    }
                                </React.Fragment>}
                        </div>
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form })}
            </EditFormContent>
        </div>

    )
}

const AuthAccountSettings = withAuth(AccountSettingsPartialForm, AccountSettingsPreview);

DonorAccountGeneralDataTemplate.propTypes = {
    donorAccountGeneralDataEditViewStore: PropTypes.object.isRequired,
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

export default defaultTemplate(DonorAccountGeneralDataTemplate);
