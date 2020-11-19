import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicFieldDropdown } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const UserCreateTemplate = function ({ userCreateViewStore }) {
    const {
        contentLoading,
        form,
        roleMultiselectStore,
    } = userCreateViewStore;

    return (
        <ApplicationEditLayout store={userCreateViewStore}>
            <Content loading={contentLoading} >
                <React.Fragment>
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row">
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('firstName')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('lastName')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('userName')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('userEmail')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('confirmUserEmail')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('password')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('confirmPassword')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BaasicFieldDropdown field={form.$('roles')} store={roleMultiselectStore} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </Content>
        </ApplicationEditLayout>
    )
};

UserCreateTemplate.propTypes = {
    userCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(UserCreateTemplate);
