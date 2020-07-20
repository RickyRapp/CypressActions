import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BasicInput, BaasicButton } from 'core/components';
import { defaultTemplate } from 'core/hoc';

class CreateLoginForm extends Component {
    render() {
        const { form,
            t,
            title,
            onBlurUsername,
            show,
            onChangeShow
        } = this.props;
        return (
            <React.Fragment>
                <h3 className="u-mar--bottom--med">{t(title)}
                    <BaasicButton
                        className="btn btn--icon"
                        icon={`u-icon u-icon--${show ? 'arrow-down' : 'arrow-right'} u-icon--sml`}
                        label={show ? t('DONOR.CREATE.LOGIN_FORM_FIELDS.HIDE') : t('DONOR.CREATE.LOGIN_FORM_FIELDS.SHOW')}
                        onlyIcon={true}
                        onClick={() => onChangeShow(!show)}
                    />
                </h3>
                {show &&
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
                    </div>}
            </React.Fragment>
        );
    }
}

CreateLoginForm.propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func,
    title: PropTypes.string.isRequired,
    onBlurUsername: PropTypes.func.isRequired,
    show: PropTypes.bool,
    onChangeShow: PropTypes.func,
};

export default defaultTemplate(CreateLoginForm);
