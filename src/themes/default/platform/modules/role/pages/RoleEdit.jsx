import React from "react";
import { defaultTemplate } from 'core/utils';
import {
    BasicInput,
    BasicTextArea
} from "core/components";
import { EditFormLayout } from "core/layouts";

function RoleEditTemplate({ editView }) {
    const { form, loaderStore, isEdit } = editView;
    return (
        <EditFormLayout form={form} isEdit={isEdit} loaderStore={loaderStore}>
            <div className="row">
                <div className="form__group col col-lrg-6">
                    <BasicInput field={form.$("name")} />
                </div>
                <div className="form__group col col-lrg-12 spc--bottom--sml">
                    <BasicTextArea field={form.$("description")} />
                </div>
            </div>
        </EditFormLayout>
    )
}

RoleEditTemplate.propTypes = {
}

export default defaultTemplate(RoleEditTemplate);