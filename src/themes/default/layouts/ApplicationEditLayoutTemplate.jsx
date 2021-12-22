import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { EditFormLayout } from 'core/layouts';

function ApplicationEditLayoutTemplate({ store, children, footerClassName }) {
    const {
        loaderStore
    } = store;

    return (
        <EditFormLayout store={store} loading={loaderStore.loading} layoutFooterVisible={store.rootStore ? true : false} footerClassName={footerClassName}>
            {children}
        </EditFormLayout>
    )
}

ApplicationEditLayoutTemplate.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
    footerClassName: PropTypes.string
};

export default defaultTemplate(ApplicationEditLayoutTemplate);
