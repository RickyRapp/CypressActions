import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicFieldDropdown,
    DatePickerField,
    BasicInput,
    BasicFieldCheckbox,
    EditFormContent,
    NumericInputField,
    BaasicFormControls
} from 'core/components';

function CharityOnlineAccountCreateTemplate({ store }) {
    const {
        charityAccountTypeDropdownStore,
        subscriptionTypeDropdownStore,
        createOnlineAccount,
        formOnlineAccount,
        onBlurUsername
    } = store;

    return (
        <div>
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
        </div>
    )
}

CharityOnlineAccountCreateTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form, onSubmit }) {
    return <div className="u-mar--bottom--med">
        <BaasicFormControls form={form} onSubmit={onSubmit} />
    </div>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    onSubmit: PropTypes.func
};

export default defaultTemplate(CharityOnlineAccountCreateTemplate);
