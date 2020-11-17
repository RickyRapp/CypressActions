import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BasicInput,
    BaasicFieldDropdown,
    BaasicModal,
    BaasicFormControls,
    BaasicButton,
    ApplicationEmptyState
} from 'core/components';
import { PageFooter, EditFormLayout } from 'core/layouts';
// import { UserProfilePartialForm } from 'application/administration/user/components';
import { UserPasswordChange } from 'application/administration/user/pages';

function UserEditTemplate({ userEditViewStore, t }) {
    const {
        form,
        openMailPasswordReset,
        openChangePassword,
        toggleLock,
        toggleApprove,
        item,
        roleMultiselectStore,
        changePasswordModal,
        rootStore,
        loaderStore
    } = userEditViewStore;

    return (
        <EditFormLayout store={userEditViewStore} emptyRenderer={<ApplicationEmptyState />} loading={loaderStore.loading}>
            <div className="card card--form card--primary card--med">
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <div className="form__group__label">{t('USER.EDIT.USERNAME_LABEL')}</div>
                        <span className="input input--text input--lrg padd--top--tny input--disabled">
                            {item && <React.Fragment>{item.userName}</React.Fragment>}
                        </span>
                    </div>
                    <div className="form__group col col-lrg-6">
                        <BasicInput field={form.$('email')} />
                    </div>
                    <div className="form__group col col-lrg-6 spc--bottom--sml">
                        <BaasicFieldDropdown field={form.$('roles')} store={roleMultiselectStore} />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-med-6">
                        <a className="display--b spc--bottom--tny" onClick={openMailPasswordReset}><span className="u-icon u-icon--sml u-icon--email-pass" /> Send password reset mail</a>
                        <a className="display--b spc--bottom--tny" onClick={openChangePassword}><span className="u-icon u-icon--sml u-icon--reset-pass" /> Change Password</a>

                        {item && <React.Fragment>
                            <a className="display--b spc--bottom--tny" onClick={toggleApprove}>{item.isApproved ? <span><span className="u-icon u-icon--sml u-icon--approve" /><span> Disapprove</span></span> : <span><span className="u-icon u-icon--sml u-icon--decline"></span><span> Approve</span></span>}</a>
                            <a className="display--b spc--bottom--tny" onClick={toggleLock}>{item.isLockedOut ? <span><span className="u-icon u-icon--sml u-icon--locked" /><span> Unlock</span></span> : <span><span className="u-icon u-icon--sml u-icon--locked"></span><span> Lock</span></span>}</a>
                        </React.Fragment>
                        }
                    </div>
                </div>
                {/* <UserProfilePartialForm form={form} /> */}
                <BaasicModal modalParams={changePasswordModal}>
                    <UserPasswordChange />
                </BaasicModal>
            </div>
            {renderEditLayoutFooterContent({
                form,
                t,
                goBack: () => rootStore.routerStore.goBack()
            })}
        </EditFormLayout>
    )
}

UserEditTemplate.propTypes = {
    userEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func
};

function renderEditLayoutFooterContent({ form, goBack, t }) {
    return <PageFooter>
        <div>
            <BaasicFormControls form={form} onSubmit={form.onSubmit} />
            <BaasicButton
                className="btn btn--base btn--ghost"
                label={t('EDIT_FORM_LAYOUT.CANCEL')}
                onClick={goBack}
            />
        </div>
    </PageFooter>
}

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    goBack: PropTypes.func,
    t: PropTypes.func
};

export default defaultTemplate(UserEditTemplate);
