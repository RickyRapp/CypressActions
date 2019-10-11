import React from 'react';

import PropTypes from 'prop-types';

import { defaultTemplate } from 'core/hoc';
import { ListLayout } from 'core/layouts';

function ApplicationListLayout({ store, children }) {
    const {
        routes,
        tableStore,
        cardViewStore,
        authorization
    } = store;
    const loaderStore = tableStore ? tableStore.loaderStore : cardViewStore.loaderStore;
    return (
        <ListLayout onCreate={routes.create} authorization={authorization} loading={loaderStore.initial && loaderStore.loading}>
            {children}
        </ListLayout>
    )
}

ApplicationListLayout.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
};

export default defaultTemplate(ApplicationListLayout);
