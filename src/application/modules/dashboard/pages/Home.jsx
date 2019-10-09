import React, { Component } from 'react';

import { setCurrentView } from 'core/utils';
import { HomeTemplate } from 'themes/application/dashboard/pages';
import { DashboardViewStore } from 'application/dashboard/stores';

@setCurrentView((rootStore) => new DashboardViewStore(rootStore), 'dashboardView')
class Home extends Component {
    render() {
        return (
            <div>
                <HomeTemplate {...this.props} />
            </div>
        )
    }
}

export default Home;
