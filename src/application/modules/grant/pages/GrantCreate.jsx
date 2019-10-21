import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantCreateTemplate } from 'themes/application/grant/pages';
import { GrantCreateViewStore } from 'application/grant/stores';

@setCurrentView((rootStore) => new GrantCreateViewStore(rootStore), 'grantCreateViewStore')
@observer
class GrantCreate extends React.Component {
    render() {
        return <GrantCreateTemplate {...this.props} />
    }
}

export default GrantCreate;
