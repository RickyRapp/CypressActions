import React from 'react';
import { OverviewTemplate } from 'themes/modules/root/pages';

class Overview extends React.Component {
    render() {
        return <OverviewTemplate {...this.props} />;
    }
}

export default Overview;
