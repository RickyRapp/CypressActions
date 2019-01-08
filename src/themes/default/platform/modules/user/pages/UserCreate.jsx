import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BasicInput, BaasicFieldSelect } from 'core/components';
import { EditFormLayout } from "core/layouts";

function UserCreateTemplate({ createView }) {
    const { form } = createView;
    return (
        <EditFormLayout form={form} isEdit={isEdit}>
            <div className="f-row">
                <BasicInput field={form.$('userName')} />
                <BasicInput field={form.$('email')} />
                <BasicInput field={form.$('password')} />
                <BasicInput field={form.$('confirmPassword')} />
                <BaasicFieldSelect field={form.$('roles')} />
            </div>
        </EditFormLayout>
    )
}

export default defaultTemplate(UserCreateTemplate);