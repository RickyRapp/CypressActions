import React from 'react';
import { defaultTemplate } from 'core/utils';
import NumberFormat from 'react-number-format';
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
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.user.edit', { id: charity.id })}>
                    <i className="icomoon icon-login-key align--v--middle spc--right--tny"></i>
                    {charity.name}
                </span>
            </div>
            <div className="form__group f-col f-col-lrg-2">
                Balance:
                <NumberFormat value={charity.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="form__group f-col f-col-lrg-2">
                Balance On Hold:
                <NumberFormat value={charity.reservedBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="form__group f-col f-col-lrg-2">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.charity.files', { id: charity.id })}>
                    <i className="icomoon icon-common-file-text align--v--middle spc--right--tny"></i>
                    Documents
                </span>
            </div>
        </div>
    )
}

function renderFiles(charity, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-2">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.charity.edit', { id: charity.id })}>
                    <i className="icomoon icon-house-1 align--v--middle spc--right--tny"></i>
                    {charity.name} - {charity.taxId}
                </span>
            </div>
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
