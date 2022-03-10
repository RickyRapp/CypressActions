import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RemoteDepositCreateTemplate } from 'themes/application/charity/remote-deposit/pages';
import { SessionCreateViewStore } from 'application/charity/remote-deposit/stores';

@setCurrentView((rootStore) => new SessionCreateViewStore(rootStore), 'sessionCreateViewStore')
@observer
class remoteDepositCreate extends React.Component {
    render() {
        return <RemoteDepositCreateTemplate {...this.props} />
    }
}

export default remoteDepositCreate;
