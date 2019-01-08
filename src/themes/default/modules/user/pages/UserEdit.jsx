import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicConfirmModal, BaasicButton } from 'core/components';
import { EditFormLayout, PageHeader } from 'core/layouts';

function UserEditTemplate({ editView }) {
    const {
        form,
        openMailPasswordReset,
        openChangePassword,
        toggleLock,
        toggleApprove,
        item,
        roleMultiselectStore,
        languageDropdownStore,
        titleDropdownStore,
        agencyDropdownStore,
        loading,
        lockConfirm,
        approveConfirm,
        mailPasswordResetConfirm
    } = editView;

    return (
        <EditFormLayout form={form} isEdit={true} loading={loading}>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6">
                    <div className="form__group__label">Username</div>
                    <span className="input input--text   input--med padd--top--tny input--disabled">{form.$('userName').value}</span>
                </div>

                <div className="form__group f-col f-col-lrg-6">
                    <BasicInput field={form.$('email')} />
                </div>
                <div className="form__group f-col f-col-lrg-12 spc--bottom--sml">
                    {/* <BaasicFieldDropdown classNames="input--multiselect" field={form.$('roles')} store={roleMultiselectStore} /> */}
                </div>
                <div className="f-col f-col-lrg-6 f-col-med-12">
                    <a className="display--b spc--bottom--tny" onClick={openMailPasswordReset}><span className="icomoon icon-email-action-lock align--v--middle" /> Send password reset mail</a>
                    <a className="display--b spc--bottom--tny" onClick={openChangePassword}><span className="icomoon icon-touch-password-lock align--v--middle" /> Change Password</a>
                </div>
                {item && <div className="f-col f-col-lrg-6 f-col-med-12">
                    <a className="display--b spc--bottom--tny" onClick={toggleApprove}>{item.isApproved ? <span><span className="icomoon icon-disable align--v--middle" /><span> Disapprove</span></span> : <span><span className="icomoon icon-check-double align--v--middle"></span><span> Approve</span></span>}</a>
                    <a className="display--b spc--bottom--tny" onClick={toggleLock}>{item.isLockedOut ? <span><span className="icomoon icon-lock-1 align--v--middle" /><span> Unlock</span></span> : <span><span className="icomoon icon-lock-unlock-1 align--v--middle"></span><span> Lock</span></span>}</a>
                </div>}
            </div>

            <BaasicConfirmModal modalParams={lockConfirm} />
            <BaasicConfirmModal modalParams={approveConfirm} />
            <BaasicConfirmModal modalParams={mailPasswordResetConfirm} />
        </EditFormLayout>
    )
}

export default defaultTemplate(UserEditTemplate);
