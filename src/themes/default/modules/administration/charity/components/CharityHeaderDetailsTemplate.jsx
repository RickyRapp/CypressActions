import React from 'react';
import { defaultTemplate } from 'core/utils';
import _ from 'lodash';

function CharityHeaderDetailsTemplate({ charityHeaderDetailsViewStore, rootStore }) {
    const {
        charity,
        isCharityType,
        isFilesType,
    } = charityHeaderDetailsViewStore;

    return (
        <React.Fragment>
            {charity ?
                <React.Fragment >
                    {isCharityType &&
                        renderCharity(charity, rootStore)}
                    {isFilesType &&
                        renderFiles(charity, rootStore)}
                </React.Fragment >
                : null}
        </React.Fragment >
    );
}

function renderCharity(charity, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-2">
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.user.edit', { id: charity.id })}>
                    Login Info
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                Balance:
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                Balance On Hold:
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => alert('TODO')}>
                    Activity And History
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-2">
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.charity.files', { id: charity.id })}>
                    Files
                </a>
            </div>
        </div>
    )
}

function renderFiles(charity, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-2">
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.charity.edit', { id: charity.id })}>
                    {charity.name} - {charity.taxId}
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                Balance:
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                Balance On Hold:
            </div>
            <div className="form__group f-col f-col-lrg-2">
                {/* TODO: */}
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => alert('TODO')}>
                    Activity And History
                </a>
            </div>
        </div>
    )
}

export default defaultTemplate(CharityHeaderDetailsTemplate);
