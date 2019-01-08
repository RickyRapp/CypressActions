import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldSelect, BaasicConfirmModal } from 'core/components';

function UserEditTemplate({ onSave, editView }) {
    const {
        loadingRoles,
        form,
        openMailPasswordReset,
        openChangePassword,
        toggleLock,
        toggleApprove,
        item,
        isEdit
    } = editView;

    if (!item) { return null; }

    const {
        isLockedOut,
        isApproved
    } = item;

    return (
        <EditFormLayout form={form} isEdit={isEdit}>
            <div className="row">
                <span>User name: </span>
                <span>{form.$('userName').value}</span>
                <BasicInput field={form.$('email')} />
                <BaasicFieldSelect field={form.$('roles')} loading={loadingRoles} />
                <a onClick={openMailPasswordReset}>Send password reset mail</a>
                <a onClick={openChangePassword}>Change Password</a>
                <a onClick={toggleLock}>{isLockedOut ? 'Unlock' : 'Lock'}</a>
                <a onClick={toggleApprove}>{isApproved ? 'Disapprove' : 'Approve'}</a>
            </div>
            <BaasicConfirmModal modalParams={editView.lockConfirm} />
            <BaasicConfirmModal modalParams={editView.approveConfirm} />
            <BaasicConfirmModal modalParams={editView.mailPasswordResetConfirm} />
        </EditFormLayout>
    )
}

export default defaultTemplate(UserEditTemplate);