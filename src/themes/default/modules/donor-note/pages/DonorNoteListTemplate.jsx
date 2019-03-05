import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { DonorNoteEdit, DonorNoteCreate } from 'modules/donor-note/pages';

function DonorNoteListTemplate({ donorNoteListViewStore }) {
    const {
        loaderStore,
        tableStore,
        editNoteId,
        onAfterEditCreate,
        onCancelEdit
    } = donorNoteListViewStore;

    return (
        <React.Fragment>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
                hidePageSizeSelect={true}
            />
            {editNoteId && <DonorNoteEdit
                id={editNoteId}
                title='Edit New Note'
                onAfterUpdate={onAfterEditCreate}
                onCancelEdit={onCancelEdit} />}

            {!editNoteId && <DonorNoteCreate
                title='Add New Note'
                onAfterCreate={onAfterEditCreate} />}
        </React.Fragment>
    );
}

export default defaultTemplate(DonorNoteListTemplate);
