import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { MasterLayoutTemplate } from 'themes/layouts';
import { setCurrentView } from '../utils';
import { defaultTemplate } from 'core/hoc';

class MasterStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

@setCurrentView(rootStore => new MasterStore(rootStore), 'masterView')
@inject(i => ({
    initialized: i.rootStore.appStore.initialized,
    language: i.rootStore.localizationStore.language
}))
class MasterLayout extends React.Component {
    render() {
        return <MasterLayoutTemplate {...this.props} />;
    }
}

MasterLayout.propTypes = {
    render: PropTypes.func
};

export default defaultTemplate(MasterLayout);
