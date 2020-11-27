import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import {
    BaasicButton,
    BaasicTable,
    BasicTextArea,
    BaasicFormControls
} from 'core/components';
import { isSome } from 'core/utils';

const DonorNoteListTemplate = function ({ donorNoteViewStore, t }) {
    const {
        tableStore,
        form,
        authorization
    } = donorNoteViewStore;

    return (
        <div className="card--primary card--med">
            <h3 className="type--lrg type--wgt--medium u-mar--bottom--tny">
                {t('DONOR_NOTE.LIST.TITLE')}
            </h3>
            <form className='form'>
                <div className="row">
                    <div className="form__group col col-lrg-6">
                        <BasicTextArea field={form.$('note')} rows={3} />
                    </div>
                    <div className="form__group col col-sml-12 u-mar--bottom--med type--right">
                        <BaasicFormControls form={form} onSubmit={form.onSubmit} />
                        {form.$('id').value &&
                            <BaasicButton
                                className="btn btn--med btn--ghost"
                                label={t('EDIT_FORM_LAYOUT.CANCEL')}
                                onClick={() => { form.$('note').clear(); form.$('id').clear() }}
                            />}
                    </div>
                </div>
            </form>
            <BaasicTable
                authorization={authorization}
                tableStore={tableStore}
                actionsComponent={renderActions}
            />
        </div>
    )
};

DonorNoteListTemplate.propTypes = {
    donorNoteViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

function renderActions({ item, actions, actionsRender }) {
    if (!isSome(actions)) return null;

    const { onEdit } = actions;
    if (!isSome(onEdit)) return null;

    let editRender = true;
    if (isSome(actionsRender)) {
        if (actionsRender.onEditRender) {
            editRender = actionsRender.onEditRender(item);
        }
    }

    return (
        <td>
            <div className="type--right">
                {isSome(onEdit) && editRender ? (
                    <BaasicButton
                        className="btn btn--icon"
                        icon='u-icon u-icon--edit u-icon--sml'
                        label='DONOR_NOTE.LIST.BUTTON.EDIT'
                        onlyIcon={true}
                        onClick={() => onEdit(item)}>
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
    authorization: PropTypes.any
};

export default defaultTemplate(DonorNoteListTemplate);

