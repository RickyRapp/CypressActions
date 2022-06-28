import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicFieldDropdown, NumberFormatInputField, BasicFieldCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const UserCreateTemplate = function ({ userCreateViewStore }) {
    
    const {
        contentLoading,
        form,
        roleMultiselectStore,
        isUser,
    } = userCreateViewStore;
    return (
        <ApplicationEditLayout store={userCreateViewStore}>
            <Content loading={contentLoading} >
                <React.Fragment>
                    <div className="card--primary card--med u-mar--bottom--med">
                        <div className="row row--form">
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('firstName')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('lastName')} />
                            </div>
                            <div className="form__group col col-lrg-6">
                                <BasicInput field={form.$('userName')}/>
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
                            {isUser &&
                                <div className="card--primary card--med u-mar--bottom--med">
                                    <div className="row row--form">
                                        <div className="form__group col col-lrg-6 ">
                                            <BasicInput field={form.$('fundName')}/>
                                        </div>
                                        <div className="form__group col col-lrg-6" style={{paddingTop:"15px"}}>
                                            <div className="card card--form mt-3">
                                                <BasicFieldCheckbox field={form.$('isPrivateClientSuite')} />
                                                <div className='type--sml'>
                                                    What is this? The Private Client suite is a platform designed to scale with your giving Initial deposit of $50,000 is required
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicInput field={form.$('addressLine1')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicInput field={form.$('addressLine2')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicInput field={form.$('city')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicInput field={form.$('state')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicInput field={form.$('zip')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <NumberFormatInputField field={form.$('phoneNumber')}/>
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <NumberFormatInputField field={form.$('securityPin')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <NumberFormatInputField field={form.$('confirmSecurityPin')} />
                                        </div>
                                        <div className="form__group col col-lrg-6">
                                            <BasicFieldCheckbox field={form.$('isThisABussinessAccount')} />
                                        </div>
                                    </div>
                                </div>}
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
