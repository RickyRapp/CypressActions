import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, NumberFormatInputField } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class ContactInfoTemplate extends Component {
    render() {
        const { form, t } = this.props;
        return (
            <React.Fragment>
                <h3 className=" type--color--note u-mar--bottom--sml">{t('DONOR.CREATE.CONTACT_INFO_FIELDS.TITLE')}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('addressLine1')} />
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('addressLine2')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('city')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('state')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('zipCode')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('addressDescription')} />
                    </div>
                </div>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('email')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('emailAddressDescription')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <NumberFormatInputField field={form.$('number')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('phoneNumberDescription')} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ContactInfoTemplate.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContactInfoTemplate);
