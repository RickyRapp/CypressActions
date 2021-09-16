import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { BasicInput, DatePickerField} from 'core/components';
import {defaultTemplate} from 'core/hoc';

class UserProfilePartialForm extends Component {
    render() {
        const {form, t} = this.props;
        return (
            <React.Fragment>
                <h5 className="u-mar--bottom--sml u-mar--top--med">{t('USER.USER_PROFILE_FIELDS.TITLE')}</h5>
                <div className="row row--form">
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('firstName')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('lastName')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <DatePickerField field={form.$('dob')} />
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('address')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('zipCode')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('city')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('country')}/>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('mobilePhone')}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserProfilePartialForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(UserProfilePartialForm);