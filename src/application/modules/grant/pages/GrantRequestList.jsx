import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantRequestListTemplate } from 'themes/application/grant/pages';
import { GrantRequestViewStore } from 'application/grant/stores';

@setCurrentView((rootStore, props) => new GrantRequestViewStore(rootStore), 'grantRequestViewStore')
@observer
class GrantRequestList extends React.Component {
    render() {
        return <GrantRequestListTemplate {...this.props} />
    }
}

export default GrantRequestList;
