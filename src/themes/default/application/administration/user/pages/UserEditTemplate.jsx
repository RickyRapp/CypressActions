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
            <div className="card--primary card--med">
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
                    <div className="form__group col col-lrg-6 u-mar--right--med">
                        <BaasicFieldDropdown field={form.$('roles')} store={roleMultiselectStore} />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-med-6">
                        <a className="display--b u-mar--right--med" onClick={openMailPasswordReset}><span className="u-icon u-icon--sml u-icon--email" /> Send password reset mail</a>
                        <a className="display--b u-mar--right--med" onClick={openChangePassword}><span className="u-icon u-icon--sml u-icon--reset" /> Change Password</a>

                        {item && <React.Fragment>
                            <a className="display--b u-mar--right--med" onClick={toggleApprove}>{item.isApproved ? <span><span className="u-icon u-icon--sml u-icon--approve" /><span> Disapprove</span></span> : <span><span className="u-icon u-icon--sml u-icon--decline"></span><span> Approve</span></span>}</a>
                            <a className="display--b u-mar--right--med" onClick={toggleLock}>{item.isLockedOut ? <span><span className="u-icon u-icon--sml u-icon--lock" /><span> Unlock</span></span> : <span><span className="u-icon u-icon--sml u-icon--unlock"></span><span> Lock</span></span>}</a>
                        </React.Fragment>
                        }
                    </div>
                </div>
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
                className="btn btn--med btn--med--wide btn--ghost u-mar--left--sml"
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
