import React from 'react';
import { defaultTemplate } from 'core/utils';
import NumberFormat from 'react-number-format';
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
                Balance:
                <NumberFormat value={charity.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="form__group f-col f-col-lrg-2">
                Balance On Hold:
                <NumberFormat value={charity.reservedBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
        </div>
    )
}

export default defaultTemplate(CharityHeaderDetailsTemplate);
