import React from 'react';
import { inject, observer } from 'mobx-react';
import { ApplicationListTemplate } from 'themes/platform/modules/application/pages';
import { setCurrentView } from 'core/utils';
import { ApplicationListViewStore } from 'platform/modules/application/stores';

@setCurrentView((rootStore) => new ApplicationListViewStore(rootStore), "listViewStore")
@observer
class ApplicationList extends React.Component {
    render() {
        return <ApplicationListTemplate {...this.props} />
    }
}

export default ApplicationList;