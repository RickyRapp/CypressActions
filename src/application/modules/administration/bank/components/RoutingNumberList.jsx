import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RoutingNumberListTemplate } from 'themes/application/administration/bank/components';
import { RoutingNumberViewStore } from 'application/administration/bank/stores';

@setCurrentView((rootStore) => new RoutingNumberViewStore(rootStore), 'routingNumberViewStore')
@observer
class RoutingNumberList extends React.Component {
    render() {
        return <RoutingNumberListTemplate {...this.props} />
    }
}

export default RoutingNumberList;
