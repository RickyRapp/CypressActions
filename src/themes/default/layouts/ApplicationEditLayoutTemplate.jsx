import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { EditFormLayout } from 'core/layouts';

function ApplicationEditLayoutTemplate({ store, children }) {
    const {
        loaderStore
    } = store;

    return (
        <EditFormLayout store={store} loading={loaderStore.loading} layoutFooterVisible={store.rootStore ? true : false}>
            {children}
        </EditFormLayout>
    )
}

ApplicationEditLayoutTemplate.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
};

export default defaultTemplate(ApplicationEditLayoutTemplate);
