import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicTable } from 'core/components';
import { DonorNoteCreateEdit } from 'modules/administration/donor-note/pages';

function DonorNoteListTemplate({ donorNoteListViewStore, t }) {
    const {
        loaderStore,
        tableStore,
        editNoteId,
        onAfterCreateEdit,
        onCancelEdit,
        userId
    } = donorNoteListViewStore;

    return (
        <React.Fragment>
            <BaasicTable
                tableStore={tableStore}
                loading={loaderStore.loading}
                hidePageSizeSelect={true}
            />

            <DonorNoteCreateEdit
                key={editNoteId}
                id={editNoteId}
                userId={userId}
                title={editNoteId ? t('EDITNEWNOTE') : t('ADDNEWNOTE')}
                onAfterCreateEdit={onAfterCreateEdit}
                onCancelEdit={onCancelEdit} />
        </React.Fragment>
    );
}

export default defaultTemplate(DonorNoteListTemplate);
