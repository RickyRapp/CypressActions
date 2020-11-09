import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantRequestTemplate } from 'themes/application/grant/pages';
import { GrantRequestEditViewStore } from 'application/grant/stores';

@setCurrentView((rootStore) => new GrantRequestEditViewStore(rootStore), 'grantRequestEditViewStore')
@observer
class GrantRequest extends React.Component {
    render() {
        return <GrantRequestTemplate {...this.props} />
    }
}

export default GrantRequest;
