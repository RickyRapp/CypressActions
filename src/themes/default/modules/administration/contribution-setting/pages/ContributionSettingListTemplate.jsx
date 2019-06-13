import React from 'react';
import { defaultTemplate } from 'core/utils';
import { ContributionSettingCreateEdit } from 'modules/common/contribution-setting/pages'
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { Page, PageContentHeader } from 'core/layouts';
import _ from 'lodash';

function ContributionSettingListTemplate({ contributionSettingListViewStore }) {
    const {
        contributionSettings,
        userId,
        loaderStore: { loading },
        load,
        bankAccounts,
        contributionSettingType,
        availableContributionSettingType
    } = contributionSettingListViewStore;

    return (
        <Page loading={loading}>
            <PageContentHeader>
                <DonorAccountHeaderDetails userId={userId} type='contribution-setting' />
            </PageContentHeader>

            {contributionSettings && contributionSettingType &&
                <div className="f-row">
                    {contributionSettings.map((setting, i) =>
                        <div key={setting.dateUpdated} className="form__group f-col f-col-lrg-3" >
                            <ContributionSettingCreateEdit
                                userId={userId}
                                id={setting.id}
                                item={setting}
                                onAfterUpdate={load}
                                bankAccounts={bankAccounts}
                                contributionSettingType={contributionSettingType}
                            />
                        </div>
                    )}
                    {availableContributionSettingType &&
                        <div className="form__group f-col f-col-lrg-3">
                            <ContributionSettingCreateEdit
                                userId={userId}
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
