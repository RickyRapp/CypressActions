import React from 'react';
import PropTypes from 'prop-types';
import {
    BasicInput,
    Date,
    BaasicModal,
    BaasicFormControls,
    SimpleBaasicTable,
    ApplicationEmptyState,
    BaasicButton,
    NumberFormatInputField,
    FormatterResolver
} from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome } from 'core/utils';
import { EditFormLayout, PageFooter } from 'core/layouts';

const SessionScanEditTemplate = function ({ sessionScanEditViewStore, t }) {

    const {
        contentLoading,
        form,
        item,
        tableStore,
        saveChanges,
    } = sessionScanEditViewStore;
debugger
    return (
        <EditFormLayout
            store={sessionScanEditViewStore}
            emptyRenderer={<ApplicationEmptyState />}
            loading={contentLoading}
            layoutFooterVisible={false}
        >
            <div className="card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">General Data</h3>
                <div className="row row--form">
                    <div className="form__group col col-sml-12 col-lrg-6 u-mar--bottom--med">
                        <BasicInput field={form.$('barcode')} />
                    </div>
                    <div className="form__group col col-sml-12 col-lrg-6 col-xlrg-4 u-mar--bottom--sml">
                        <NumberFormatInputField field={form.$('amount')} />
                    </div>
                </div>

                {renderEditLayoutFooterContent({ form, saveChanges })}
            </div>

            <div className="card--primary card--med u-mar--bottom--med">
                <SimpleBaasicTable
                    tableStore={tableStore}
                    actionsComponent={renderActions}
                />
            </div>
        </EditFormLayout >
    )
};

SessionScanEditTemplate.propTypes = {
    sessionEditViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderEditLayoutFooterContent({ form, saveChanges }) {
    return <PageFooter>
        <div>
            <BaasicButton onClick={() => saveChanges()} className="btn btn--med btn--med--wide btn--secondary" label="Save" />
            <BaasicFormControls form={form} onSubmit={form.onSubmit} className="btn btn--med btn--med--wide btn--secondary u-mar--left--sml" label="Save and Approve" />
        </div>
    </PageFooter>
}

function renderActions({ item, actions, actionsRender, t }) {
    if (!isSome(actions)) return null;

    const { onRemove } = actions;
    if (!isSome(onRemove)) return null;

    return (
        <td>
            <div className="type--right">
                {isSome(onRemove) ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--decline u-icon--base'
                        label='SESSION.EDIT.LIST.BUTTON.REMOVE_SESSION_CERTIFICATE'
                        onlyIcon={true}
                        onClick={() => onRemove(item)}>
                    </BaasicButton>
                ) : null}
            </div>
        </td>
    )
}

renderActions.propTypes = {
    item: PropTypes.object,
    actions: PropTypes.object,
    actionsRender: PropTypes.object,
    authorization: PropTypes.any,
    t: PropTypes.func
};

renderEditLayoutFooterContent.propTypes = {
    form: PropTypes.any,
    saveChanges: PropTypes.func
};

export default defaultTemplate(SessionScanEditTemplate);
