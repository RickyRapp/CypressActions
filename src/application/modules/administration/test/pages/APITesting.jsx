import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { APITestingTemplate } from 'themes/application/administration/test/pages';
import { APITestingViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new APITestingViewStore(rootStore), 'apiTestingViewStore')
@observer
class APITesting extends React.Component {
    render() {
        return <APITestingTemplate {...this.props} />
    }
}

export default APITesting;
