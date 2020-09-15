import React, { Component } from 'react';

import { setCurrentView } from 'core/utils';
import { DashboardTemplate } from 'themes/application/dashboard/pages';
import { DashboardViewStore } from 'application/dashboard/stores';

@setCurrentView((rootStore) => new DashboardViewStore(rootStore), 'dashboardViewStore')
class Dashboard extends Component {
    render() {
        return (
            <DashboardTemplate {...this.props} />
        )
    }
}

export default Dashboard;
