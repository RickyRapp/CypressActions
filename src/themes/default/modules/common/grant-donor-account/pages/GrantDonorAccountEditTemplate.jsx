import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { GrantDonorAccountEditFormTemplate } from 'themes/modules/common/grant-donor-account/components'
import _ from 'lodash';

function GrantDonorAccountEditTemplate({ grantDonorAccountEditViewStore }) {
    const {
        form,
        loaderStore: { loading },
        userId,
        isAdministratorOrEmployeeRole
    } = grantDonorAccountEditViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={true} loading={loading}>
                    {isAdministratorOrEmployeeRole &&
                        <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='grant' /></PageContentHeader>}
                    <GrantDonorAccountEditFormTemplate grantDonorAccountEditViewStore={grantDonorAccountEditViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantDonorAccountEditTemplate.propTypes = {
    grantDonorAccountEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantDonorAccountEditTemplate);
