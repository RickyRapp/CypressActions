import React from "react";
import _ from 'lodash';
import { defaultTemplate } from "core/utils";
import { BasicInput, BasicTextArea, BaasicDropdown, EmptyState } from "core/components";
import { EditFormLayout, PageHeader, Content } from 'core/layouts';

function RoleEditTemplate({ editView }) {
    const {
        form,
        loaderStore,
        isEdit,
        rootStore
    } = editView;

    return (
        <EditFormLayout form={form} isEdit={isEdit} loading={loaderStore.loading}>
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

function renderEmptyState(rootStore) {
    return <EmptyState 
        title="ROLE.EDIT.NO_AGENCY_TITLE" 
        description="ROLE.EDIT.NO_AGENCY_DESCRIPTION"
        callToActionLabel="ROLE.EDIT.NO_AGENCY_ACTION_LABEL"
        callToAction={() => rootStore.routerStore.goTo('master.app.main.role.list')}
    />
}

RoleEditTemplate.propTypes = {};

export default defaultTemplate(RoleEditTemplate);
