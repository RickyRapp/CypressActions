import React, { Component } from 'react';
import { setCurrentView } from 'core/utils';
import { AdminDashboardTemplate } from 'themes/application/dashboard/pages';
import { AdminDashboardViewStore } from 'application/dashboard/stores';

@setCurrentView((rootStore) => new AdminDashboardViewStore(rootStore), 'adminDashboardViewStore')
class AdminDashboard extends Component {
    render() {
        return (
            <AdminDashboardTemplate {...this.props} />
        )
    }
}

export default AdminDashboard;
