import React from 'react';
import { defaultTemplate } from 'core/utils';
import _ from 'lodash';

function CharityHeaderDetailsTemplate({ charityHeaderDetailsViewStore, rootStore }) {
    const {
        charity,
        isCharityType,
    } = charityHeaderDetailsViewStore;

    return (
        <React.Fragment>
            {charity ?
                <React.Fragment >
                    {isCharityType &&
                        renderCharity(charity, rootStore)}
                </React.Fragment >
                : null}
        </React.Fragment >
    );
}

function renderCharity(charity, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <a className="btn btn--xsml btn--ghost">
                    {charity.name} - {charity.taxId}
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.charity.files', { id: charity.id })}>
                    Files
            </a>
            </div>
        </div>
    )
}

export default defaultTemplate(CharityHeaderDetailsTemplate);
