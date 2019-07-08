import React from 'react';
import { defaultTemplate, getDonorName } from 'core/utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

function DonorAccountHeaderDetailsTemplate({ donorAccountHeaderDetailsViewStore, rootStore }) {
    const {
        donorAccount,
        isDonorAccountType,
        isContributionType,
        isContributionSettingType,
        isActivityAndHistoryType,
        isGrantType
    } = donorAccountHeaderDetailsViewStore;

    return (
        <React.Fragment>
            {donorAccount ?
                <React.Fragment >
                    {isDonorAccountType &&
                        renderDonorAccount(donorAccount, rootStore)}

                    {isContributionType &&
                        renderContribution(donorAccount, rootStore)}

                    {isContributionSettingType &&
                        renderContributionSetting(donorAccount, rootStore)}

                    {isActivityAndHistoryType &&
                        renderActivityAndHistory(donorAccount, rootStore)}

                    {isGrantType &&
                        renderGrant(donorAccount, rootStore)}
                </React.Fragment >
                : null}
        </React.Fragment >
    );
}

function renderDonorAccount(donorAccount, rootStore) {
    return (
        <React.Fragment>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-2">
                    <span
                        onClick={() => rootStore.routerStore.navigate('master.app.administration.user.edit', { id: donorAccount.id })}>
                        <i className="icomoon icon-login-key align--v--middle spc--right--tny"></i>
                        Login Info
                </span>
                </div>
                <div className="form__group f-col f-col-lrg-2">
                    <span
                        onClick={() => rootStore.routerStore.navigate('master.app.administration.activity-and-history', null, { donorAccountId: donorAccount.id })}>
                        <i className="icomoon icon-accounting-invoice-hand align--v--middle spc--right--tny"></i>
                        Activity And History
                </span>
                </div>
                <div className="form__group f-col f-col-lrg-2">
                    <span
                        onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.list', null, { donorAccountId: donorAccount.id })}>
                        <i className="icomoon icon-cash-payment-bills align--v--middle spc--right--tny"></i>
                        Contributions
                </span>
                </div>
                <div className="form__group f-col f-col-lrg-2">
                    <span
                        onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: donorAccount.id })}>
                        <i className="icomoon icon-settings-slider align--v--middle spc--right--tny"></i>
                        Contribution Settings
                </span>
                </div>
            </div>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-2">
                    Available Balance:
                <NumberFormat value={donorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                </div>
            </div>
        </React.Fragment>
    )
}

function renderContribution(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <i className="icomoon icon-style-two-pin-user align--v--middle spc--right--tny"></i>
                    {getDonorName(donorAccount)}
                </span>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <NumberFormat value={donorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Initial Contribution:
                <strong>
                    {donorAccount.initialContribution ?
                        `Yes - Additional $${donorAccount.contributionMinimumAdditional}` :
                        `No - Initial $${donorAccount.contributionMinimumInitial}`}
                </strong>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: donorAccount.id })}>
                    <i className="icomoon icon-settings-slider align--v--middle spc--right--tny"></i>
                    Settings
                </span>

            </div>
        </div>
    )
}

function renderContributionSetting(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <i className="icomoon icon-style-two-pin-user align--v--middle spc--right--tny"></i>
                    {getDonorName(donorAccount)}
                </span>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <NumberFormat value={donorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Initial Contribution:
                <strong>
                    {donorAccount.initialContribution ?
                        `Yes - Additional $${donorAccount.contributionMinimumAdditional}` :
                        `No - Initial $${donorAccount.contributionMinimumInitial}`}
                </strong>
            </div>
        </div>
    )
}

function renderActivityAndHistory(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <i className="icomoon icon-style-two-pin-user align--v--middle"></i>
                    {getDonorName(donorAccount)}
                </span>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <NumberFormat value={donorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Balance On Hold:
                <NumberFormat value={donorAccount.balanceOnHold} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
        </div>
    )
}

function renderGrant(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <span
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <i className="icomoon icon-style-two-pin-user align--v--middle"></i>
                    {getDonorName(donorAccount)}
                </span>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <NumberFormat value={donorAccount.availableBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Line Of Credit:
                <NumberFormat value={donorAccount.lineOfCredit} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Grant Fee:
                <NumberFormat value={donorAccount.grantFee} displayType={'text'} thousandSeparator={true} suffix={'%'} decimalScale={2} fixedDecimalScale={true} />
            </div>
        </div>
    )
}

export default defaultTemplate(DonorAccountHeaderDetailsTemplate);
