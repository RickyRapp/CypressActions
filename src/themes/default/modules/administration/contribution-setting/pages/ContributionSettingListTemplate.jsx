import React from 'react';
import { defaultTemplate } from 'core/utils';
import { ContributionSettingEdit, ContributionSettingCreate } from 'modules/administration/contribution-setting/pages'
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { Page, PageContentHeader } from 'core/layouts';
import _ from 'lodash';

function ContributionSettingListTemplate({ contributionSettingListViewStore }) {
    const {
        contributionSettings,
        userId,
        permissions,
        load,
        bankAccounts,
        contributionSettingType,
        availableContributionSettingType
    } = contributionSettingListViewStore;

    return (
        <Page>
            {userId && permissions.employeeUpdate ?
                <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='contribution-setting' /></PageContentHeader> : null}

            {contributionSettings && contributionSettingType &&
                <div className="f-row">
                    {contributionSettings.map((setting, i) =>
                        <div key={setting.dateUpdated} className="form__group f-col f-col-lrg-3" >
                            <ContributionSettingEdit
                                item={setting}
                                onAfterUpdate={load}
                                bankAccounts={bankAccounts}
                                contributionSettingType={contributionSettingType}
                            />
                        </div>
                    )}
                    {availableContributionSettingType &&
                        <div className="form__group f-col f-col-lrg-3">
                            <ContributionSettingCreate
                                onAfterCreate={load}
                                bankAccounts={bankAccounts}
                                contributionSettingType={availableContributionSettingType}
                            />
                        </div>}
                </div>}
        </Page>
    );
}

function toggleSetting(onChangePrimaryAddress) {
    return (
        <button
            onClick={onChangePrimaryAddress}
            className="btn btn--med btn--ghost"
            type="button">
            Toggle Setting
                </button>
    )
}

function renderSetting(item) {
    return (
        <React.Fragment>
            <h3>{item.contributionSettingsTypeId}</h3>
            <div className="f-row">
                <div className="form__group f-col f-col-lrg-12">
                    Date Created: {item.dateCreated}
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    Amount: {item.amount}
                </div>
                <div className="form__group f-col f-col-lrg-12">
                    Bank Account: {item.bankAccountId}
                </div>
            </div>
        </React.Fragment>
    )
}

export default defaultTemplate(ContributionSettingListTemplate);
