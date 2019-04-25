import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Page } from 'core/layouts';
import { DetailsTemplate } from 'themes/modules/common/contribution/components';
import _ from 'lodash';


function ContributionDetailsTemplate({ contributionDetailsViewStore }) {
    const {
        contribution,
        paymentTypes,
    } = contributionDetailsViewStore;

    return (
        <React.Fragment>
            {contribution &&
                <Page>
                    <DetailsTemplate contribution={contribution} paymentTypes={paymentTypes} />
                </Page >}
        </React.Fragment>
    );
};

export default defaultTemplate(ContributionDetailsTemplate);
