import React from 'react';
import { inject } from 'mobx-react';
import { MainLayoutTemplate } from 'themes/layouts';

function MainLayout(props) {
    return (
        <MainLayoutTemplate {...props} />
    )
}

export default inject((i) => ({
    initialized: i.rootStore.appStore.initialized,
    viewStore: i.rootStore.viewStore
}))(MainLayout);