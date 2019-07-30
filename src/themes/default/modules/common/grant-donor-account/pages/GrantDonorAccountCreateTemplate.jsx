import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { GrantDonorAccountCreateFormTemplate } from 'themes/modules/common/grant-donor-account/components'
import _ from 'lodash';

function GrantDonorAccountCreateTemplate({ grantDonorAccountCreateViewStore }) {
    const {
        form,
        loaderStore: { loading },
        userId,
        isAdministratorOrEmployeeRole
    } = grantDonorAccountCreateViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={false} loading={loading}>
                    {isAdministratorOrEmployeeRole &&
                        <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='grant' /></PageContentHeader>}
                    <GrantDonorAccountCreateFormTemplate grantDonorAccountCreateViewStore={grantDonorAccountCreateViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantDonorAccountCreateTemplate.propTypes = {
    grantDonorAccountCreateViewStore: PropTypes.object.isRequired
}

export default defaultTemplate(GrantDonorAccountCreateTemplate);
