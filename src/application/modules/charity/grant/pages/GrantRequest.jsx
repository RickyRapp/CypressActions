import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantRequestTemplate } from 'themes/application/charity/grant/pages';
import { GrantRequestCreateViewStore } from 'application/charity/grant/stores';

@setCurrentView((rootStore) => new GrantRequestCreateViewStore(rootStore), 'grantRequestCreateViewStore')
@observer
class GrantRequest extends React.Component {
    render() {
        return <GrantRequestTemplate {...this.props} />
    }
}

export default GrantRequest;
