import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, NumberFormatInputField } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class ContactInfoForm extends Component {
    render() {
        const { form, t } = this.props;
        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t('DONOR.CREATE.CONTACT_INFO_FIELDS.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('address.addressLine1')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('address.addressLine2')} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <BasicInput field={form.$('address.city')} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <BasicInput field={form.$('address.state')} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <BasicInput field={form.$('address.zipCode')} />
                    </div>
                    <div className="form__group col col-lrg-2">
                        <BasicInput field={form.$('address.description')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('emailAddress.email')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('emailAddress.description')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <NumberFormatInputField field={form.$('phoneNumber.number')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('phoneNumber.description')} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ContactInfoForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContactInfoForm);
