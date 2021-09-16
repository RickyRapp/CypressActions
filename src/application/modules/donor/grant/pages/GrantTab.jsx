import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantTabTemplate } from 'themes/application/donor/grant/pages';
import { GrantTabViewStore } from 'application/donor/grant/stores';

@setCurrentView((rootStore) => new GrantTabViewStore(rootStore), 'grantTabViewStore')
@observer
class GrantTab extends React.Component {
    render() {
        return <GrantTabTemplate {...this.props} />
    }
}

export default GrantTab;
