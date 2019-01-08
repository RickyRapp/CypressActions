import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput } from 'core/components';

function UserPasswordChangeTemplate({ currentView }) {
    const { editView: { passwordChangeForm } } = currentView;

    return (
        <section className="w--400--px align--h--center padd--top--med">
            <form className="form spc--top--med" onSubmit={passwordChangeForm.onSubmit}>
                <h3 className="spc--bottom--sml">Change Password</h3>
                <BasicInput field={passwordChangeForm.$('newPassword')} />
                <BasicInput field={passwordChangeForm.$('confirmPassword')} />
                {
                    passwordChangeForm.error && (
                        <div>
                            <p className="type--color--warning">{passwordChangeForm.error}</p>
                        </div>
                    )
                }
                <div>
                    <button className="btn btn--med btn--primary spc--top--tny display--ib" type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}

export default defaultTemplate(UserPasswordChangeTemplate);