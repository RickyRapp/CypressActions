import React from 'react'
import { defaultTemplate } from 'core/utils';
import { Page, PageContentHeader } from 'core/layouts';
import { CharityHeaderDetails } from 'modules/administration/charity/components';
import { DocumentList, DocumentCreate } from 'modules/common/media-upload/pages';

function CharityFilesTemplate({ charityFilesViewStore }) {
    const {
        userId,
        loaderStore: { loading },
        onRefresh,
        refresh,
        path,
        onAfterFileUpload
    } = charityFilesViewStore;

    return (
        <Page loading={loading}>
            <PageContentHeader>
                <CharityHeaderDetails userId={userId} type='files' /></PageContentHeader>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-6 card">
                    {path &&
                        <DocumentCreate onRefresh={onRefresh} userId={userId} path={path} onAfterFileUpload={onAfterFileUpload} />}
                </div>
                <div className="form__group f-col f-col-lrg-6" key={refresh}>
                    <DocumentList userId={userId} />
                </div>
            </div>
        </Page>
    );
};

export default defaultTemplate(CharityFilesTemplate);