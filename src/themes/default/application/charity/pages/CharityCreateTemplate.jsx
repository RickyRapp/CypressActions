import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { ApplicationEditLayout, Content } from 'core/layouts';

const CharityCreateTemplate = function ({ charityCreateViewStore }) {
    const {
        contentLoading,
        form
    } = charityCreateViewStore;

    return (
        <ApplicationEditLayout store={charityCreateViewStore}>
            <Content loading={contentLoading} >
                <React.Fragment>
                    <div className="row">
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('name')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('taxId')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('dba')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('charityTypeId')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('charityStatusId')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('address.addressLine1')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('address.addressLine2')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('address.city')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('address.state')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('address.zipCode')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('emailAddress.email')} />
                        </div>
                        <div className="form__group col col-lrg-4">
                            <BasicInput field={form.$('phoneNumber.number')} />
                        </div>
                    </div>
                </React.Fragment>
            </Content>
        </ApplicationEditLayout>
    )
};

CharityCreateTemplate.propTypes = {
    charityCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(CharityCreateTemplate);
