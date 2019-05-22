import React from 'react';
import { observer } from 'mobx-react';
import { GrantCreateTemplate } from 'themes/modules/administration/grant/pages';
import { setCurrentView } from 'core/utils';
import { GrantCreateViewStore } from 'modules/administration/grant/stores';

@setCurrentView(rootStore => new GrantCreateViewStore(rootStore), 'grantCreateViewStore')
@observer
class GrantCreate extends React.Component {
    render() {
        return <GrantCreateTemplate {...this.props} />;
    }
}

export default GrantCreate;