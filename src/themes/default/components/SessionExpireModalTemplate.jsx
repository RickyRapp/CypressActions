import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';
import {BaasicButton, Gravatar, Loader} from 'core/components';
import {renderIf} from 'core/utils';

const SessionExpireModalTemplate = function (props) {
    const t = props.t;
    const { loaderStore: { loading }, passwordInputValue, passwordField, changepasswordInputValue, login, error, user } = props.sessionExpireViewStore;

    function navigateLogin() {
        props.sessionExpireViewStore.navigateLogin();
        props.modalParams.close();
    }

    const handleOnChange = (e) => {
        changepasswordInputValue(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <div>
            <h6 className='spc--bottom--med'>
                {t('SESSION.EXPIRE_TITLE')}
            </h6>
            <div className='spc--bottom--med'>
                <Gravatar email={user.email}/>
                <span className='type--wgt--medium'>{user.userName}</span>
            </div>
            <div className='spc--bottom--med'>
                <p className='display--ib type--color--textdark card--borderleft'>
                    {t('SESSION.EXPIRE_MESSAGE')}
                    <a className='display--ib type--color--primary'
                       onClick={() => navigateLogin()}>&nbsp; {t('SESSION.EXPIRE_MESSAGE_HERE')} &nbsp;</a>
                    {t('SESSION.EXPIRE_MESSAGE_AFTER_HERE')}
                </p>
            </div>

            <form>
                <div>
                    <div className='form__group__label'>{t(passwordField.label)}*</div>
                    <input
                        type={passwordField.type}
                        className={'input input--lrg input--text' + (error ? ' input--warning' : '')} //{...otherProps}
                        placeholder={t(passwordField.placeholder)}
                        onChange={handleOnChange}
                    />
                    {renderIf(error)(<p className='type--tiny type--color--warning'>{error}</p>)}
                </div>

                <BaasicButton className='btn btn--med btn--tertiary spc--top--med' type='submit' //disabled={form.submitting}
                                onClick={submit}
                                disabled={(error ? true : false) || passwordInputValue ? false : true || loading}
                                label={t('SESSION.EXPIRE_LOGIN_BUTTON_LABEL')}/>
            </form>
            {loading &&
            <span className='loader--login padd--top--med'>
                <Loader/>
            </span>
            }
        </div>
    )
};

SessionExpireModalTemplate.propTypes = {
    modalParams: PropTypes.object.isRequired,
    sessionExpireViewStore: PropTypes.object.isRequired,
    t: PropTypes.any
};

export default defaultTemplate(SessionExpireModalTemplate);
