import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RoutingNumberCreateTemplate } from 'themes/application/administration/bank/components';
import { RoutingNumberCreateViewStore } from 'application/administration/bank/stores';

@setCurrentView((rootStore, props) => new RoutingNumberCreateViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterAction), 'routingNumberCreateViewStore')
@observer
class RoutingNumberCreate extends React.Component {
    render() {
        return <RoutingNumberCreateTemplate {...this.props} />
    }
}

export default RoutingNumberCreate;
