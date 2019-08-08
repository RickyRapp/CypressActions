import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { GrantEditFormTemplate } from 'themes/modules/common/grant/components'
import _ from 'lodash';

function GrantEditTemplate({ grantEditViewStore }) {
    const {
        form,
        loaderStore: { loading },
        userId,
        isAdministratorOrEmployeeRole
    } = grantEditViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={true} loading={loading}>
                    {isAdministratorOrEmployeeRole &&
                        <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='grant' /></PageContentHeader>}
                    <GrantEditFormTemplate grantEditViewStore={grantEditViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantEditTemplate.propTypes = {
    grantEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantEditTemplate);
