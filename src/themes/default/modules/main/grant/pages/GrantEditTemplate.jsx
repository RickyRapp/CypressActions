import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import { EditFormLayout, PageContentHeader } from 'core/layouts';
import { GrantEditFormTemplate } from 'themes/modules/common/grant/components'
import _ from 'lodash';

function GrantEditTemplate({ grantEditViewStore }) {
    const {
        form,
        loaderStore: { loading }
    } = grantEditViewStore;

    return (
        <React.Fragment>
            {form &&
                <EditFormLayout form={form} isEdit={true} loading={loading}>
                    <GrantEditFormTemplate grantEditViewStore={grantEditViewStore} />
                </EditFormLayout>}
        </React.Fragment >
    );
};

GrantEditTemplate.propTypes = {
    grantEditViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(GrantEditTemplate);
