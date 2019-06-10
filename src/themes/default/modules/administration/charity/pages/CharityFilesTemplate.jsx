import React from 'react'
import { defaultTemplate } from 'core/utils';
import { Page, PageContentHeader } from 'core/layouts';
import { CharityHeaderDetails } from 'modules/administration/charity/components';
import { DocumentList, DocumentCreate } from 'modules/common/media-upload/pages';

function CharityFilesTemplate({ charityFilesViewStore }) {
    const {
        id,
        loaderStore,
        onRefresh,
        refresh,
        uploadFunc
    } = charityFilesViewStore;

    return (
        <Page loading={loaderStore.loading}>
            <PageContentHeader>
                <CharityHeaderDetails userId={id} type='files' /></PageContentHeader>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6 card">
                    <DocumentCreate onRefresh={onRefresh} uploadFunc={uploadFunc} />
                </div>
                <div className="form__group f-col f-col-lrg-6" key={refresh}>
                    <DocumentList id={id} />
                </div>
            </div>
        </Page>
    );
};

export default defaultTemplate(CharityFilesTemplate);