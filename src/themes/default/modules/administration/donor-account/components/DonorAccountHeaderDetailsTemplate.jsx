import React from 'react';
import { defaultTemplate } from 'core/utils';
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
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                <a className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.user.edit', { id: donorAccount.id })}>
                    Login Info
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <a className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.activity-and-history', null, { donorAccountId: donorAccount.id })}>
                    Activity And History
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.list', null, { donorAccountId: donorAccount.id })}>
                    Contributions
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                <a className="btn btn--xsml btn--ghost" onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: donorAccount.id })}>Contribution Settings</a>
            </div>
        </div>
    )
}


function renderContribution(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                Donor Name:
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <strong>{donorAccount.coreUser.firstName} {donorAccount.coreUser.lastName}</strong>
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <strong>${donorAccount.availableBalance}</strong>
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
                Settings:
                <strong>
                    <a
                        className="btn btn--xsml btn--ghost"
                        onClick={() => rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: donorAccount.id })}>
                        <strong>Open</strong>
                    </a>
                </strong>
            </div>
        </div>
    )
}

function renderContributionSetting(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                Donor Name:
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <strong>{donorAccount.coreUser.firstName} {donorAccount.coreUser.lastName}</strong>
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <strong>${donorAccount.availableBalance}</strong>
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
                Donor Name:
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <strong>{donorAccount.coreUser.firstName} {donorAccount.coreUser.lastName}</strong>
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <strong>${donorAccount.availableBalance}</strong>
            </div>
        </div>
    )
}

function renderGrant(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                Donor Name:
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: donorAccount.id })}>
                    <strong>{donorAccount.coreUser.firstName} {donorAccount.coreUser.lastName}</strong>
                </a>
            </div>
            <div className="form__group f-col f-col-lrg-3">
                Available Balance:
                <strong>${donorAccount.availableBalance}</strong>
            </div>
        </div>
    )
}

export default defaultTemplate(DonorAccountHeaderDetailsTemplate);
