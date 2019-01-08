import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/utils';
import {BasicInput, BaasicButton, } from 'core/components';
import { EditFormLayout, PageHeader } from 'core/layouts';

const UserCreateTemplate = function ({ userCreateViewStore }) {
    const {
        form,
        titleDropdownStore,
        languageDropdownStore,
        roleMultiselectStore,
        loading,
    } = userCreateViewStore;

    return (
        <EditFormLayout form={form} isEdit={true} loading={loading}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('userName')}/>
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('email')}/>
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('password')}/>
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('confirmPassword')}/>
                </div>
                <div className="form__group f-col f-col-lrg-6">
                    {/* <BaasicFieldDropdown classNames="input--multiselect" field={form.$('roles')}
                                            store={roleMultiselectStore}/> */}
                </div>
            </div>
        </EditFormLayout>        
    )
};

UserCreateTemplate.propTypes = {
    userCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(UserCreateTemplate);
