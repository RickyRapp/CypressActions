import React from 'react'
import { defaultTemplate } from 'core/utils';
import { Page, PageContentHeader } from 'core/layouts';
import { CharityHeaderDetails } from 'modules/main/charity/components';
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
            <React.Fragment>
                <PageContentHeader><CharityHeaderDetails userId={id} type='charity' /></PageContentHeader>
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-6">
                        <DocumentCreate onRefresh={onRefresh} uploadFunc={uploadFunc} />
                    </div>
                    <div className="form__group f-col f-col-lrg-6" key={refresh}>
                        <DocumentList id={id} />
                    </div>
                </div>
            </React.Fragment>
        </Page >
    );
};

export default defaultTemplate(CharityFilesTemplate);