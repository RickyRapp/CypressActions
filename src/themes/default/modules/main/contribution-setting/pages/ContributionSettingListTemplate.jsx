import React from 'react';
import { defaultTemplate } from 'core/utils';
import { ContributionSettingEdit, ContributionSettingCreate } from 'modules/main/contribution-setting/pages'
import { Page } from 'core/layouts';
import _ from 'lodash';

function ContributionSettingListTemplate({ contributionSettingListViewStore }) {
    const {
        contributionSettings,
        load,
        bankAccounts,
        contributionSettingType,
        availableContributionSettingType
    } = contributionSettingListViewStore;

    return (
        <Page>
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

export default defaultTemplate(ContributionSettingListTemplate);
