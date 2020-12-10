import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { DashboardHeaderTemplate } from 'themes/application/charity/dashboard/components';

@inject(i => ({
    rootStore: i.rootStore,
}))
@observer
class DashboardHeader extends Component {
    render() {
        return (
            <DashboardHeaderTemplate {...this.props} />
        )
    }
}

export default DashboardHeader;
