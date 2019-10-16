import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class CreateLoginForm extends Component {
    render() {
        const { form,
            t,
            title,
            onBlurUsername
        } = this.props;
        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t(title)}</h3>
                <div className="row">
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('coreUser.username')} onBlur={onBlurUsername} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('coreUser.coreMembership.password')} />
                    </div>
                    <div className="form__group col col-lrg-3">
                        <BasicInput field={form.$('coreUser.coreMembership.confirmPassword')} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

CreateLoginForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func,
    title: PropTypes.string.isRequired,
    onBlurUsername: PropTypes.func.isRequired
};

export default defaultTemplate(CreateLoginForm);
