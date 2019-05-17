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
