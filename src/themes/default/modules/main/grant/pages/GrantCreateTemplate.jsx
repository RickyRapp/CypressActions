import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout } from 'core/layouts';
import { GrantCreateFormTemplate } from 'themes/modules/common/grant/components'
import _ from 'lodash';

function GrantCreateTemplate({ grantCreateViewStore }) {
    const {
        form,
        loaderStore: { loading } } = grantCreateViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={false} loading={loading}>
                    <GrantCreateFormTemplate grantCreateViewStore={grantCreateViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantCreateTemplate.propTypes = {
    grantCreateViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantCreateTemplate);
