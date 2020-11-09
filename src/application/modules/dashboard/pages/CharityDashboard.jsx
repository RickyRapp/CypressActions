import React, { Component } from 'react';
import { setCurrentView } from 'core/utils';
import { CharityDashboardTemplate } from 'themes/application/dashboard/pages';
import { CharityDashboardViewStore } from 'application/dashboard/stores';

@setCurrentView((rootStore) => new CharityDashboardViewStore(rootStore), 'CharityDashboardViewStore')
class CharityDashboard extends Component {
    render() {
        return (
            <CharityDashboardTemplate {...this.props} />
        )
    }
}

export default CharityDashboard;
