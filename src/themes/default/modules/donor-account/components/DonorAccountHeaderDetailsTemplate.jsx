import React from 'react';
import { defaultTemplate } from 'core/utils';
import _ from 'lodash';

function DonorAccountHeaderDetailsTemplate({ donorAccountHeaderDetailsViewStore, rootStore }) {
    const {
        donorAccount,
        isContributionType,
        isContributionSettingType,
        isActivityAndHistoryType
    } = donorAccountHeaderDetailsViewStore;

    return (
        <React.Fragment>
            {donorAccount ?
                <React.Fragment >
                    {isContributionType &&
                        renderContribution(donorAccount, rootStore)}

                    {isContributionSettingType &&
                        renderContributionSetting(donorAccount, rootStore)}

                    {isActivityAndHistoryType &&
                        renderActivityAndHistory(donorAccount, rootStore)}
                </React.Fragment >
                : null}
        </React.Fragment >
    );
}

function renderContribution(donorAccount, rootStore) {
    return (
        <div className="f-row">
            <div className="form__group f-col f-col-lrg-3">
                Donor Name:
                <a
                    className="btn btn--xsml btn--ghost"
                    onClick={() => rootStore.routerStore.navigate('master.app.main.donor.account.edit', { id: donorAccount.id })}>
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
                        onClick={() => rootStore.routerStore.navigate('master.app.main.contribution.setting', { id: donorAccount.id })}>
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
                    onClick={() => rootStore.routerStore.navigate('master.app.main.donor.account.edit', { id: donorAccount.id })}>
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
                    onClick={() => rootStore.routerStore.navigate('master.app.main.donor.account.edit', { id: donorAccount.id })}>
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
