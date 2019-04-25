import React from 'react';
import { defaultTemplate } from 'core/utils';
import { PageContentHeader, Page } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { DetailsTemplate } from 'themes/modules/common/contribution/components';

function ContributionDetailsTemplate({ contributionDetailsViewStore }) {
    const {
        contribution,
        paymentTypes,
    } = contributionDetailsViewStore;

    return (
        <React.Fragment>
            {contribution &&
                <Page>
                    <PageContentHeader><DonorAccountHeaderDetails userId={contribution.donorAccountId} type='contribution' /></PageContentHeader>
                    <DetailsTemplate contribution={contribution} paymentTypes={paymentTypes} />
                </Page >}
        </React.Fragment>
    );
};

export default defaultTemplate(ContributionDetailsTemplate);
