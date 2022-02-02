import React from 'react';

import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { BasicInput, BaasicButton, BasicFieldCheckbox } from 'core/components';

function UserPasswordChangeTemplate(props) {
    const { userPasswordChangeViewStore } = props;
    const { userPasswordChangeForm } = userPasswordChangeViewStore;

    return (
        <section >
            <form className='form' onSubmit={userPasswordChangeForm.onSubmit}>
                <h3 className='u-mar--bottom--sml'>Change Password</h3>
                <div className='u-mar--bottom--tny'>
                    <BasicInput field={userPasswordChangeForm.$('newPassword')} />
                </div>
                <BasicFieldCheckbox field={userPasswordChangeForm.$('sendMailNotification')} />
                <div className='u-mar--top--sml type--right'>
                    <BaasicButton
                        className='btn btn--med btn--med--wide btn--primary spc--top--sml display--ib'
                        type='submit'
                        label='Submit'
                        disabled={userPasswordChangeForm.submitting || userPasswordChangeForm.validating || !userPasswordChangeForm.isValid}
                    />
                </div>
            </form>
        </section>
    );
}

UserPasswordChangeTemplate.propTypes = {
    userPasswordChangeViewStore: PropTypes.object,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(UserPasswordChangeTemplate);
