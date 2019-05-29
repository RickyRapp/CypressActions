import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { DonorAccountHeaderDetails } from 'modules/administration/donor-account/components'
import { GrantCreateFormTemplate } from 'themes/modules/common/grant/components'
import _ from 'lodash';

function GrantCreateTemplate({ grantCreateViewStore }) {
    const {
        form,
        loaderStore: { loading },
        userId
    } = grantCreateViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={false} loading={loading}>
                    <PageContentHeader><DonorAccountHeaderDetails userId={userId} type='grant' /></PageContentHeader>
                    <GrantCreateFormTemplate grantCreateViewStore={grantCreateViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
