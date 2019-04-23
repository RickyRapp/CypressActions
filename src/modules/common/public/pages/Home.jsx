import React from 'react';
import { HomeTemplate } from 'themes/modules/common/public/pages';

class Home extends React.Component {
    render() {
        return <HomeTemplate {...this.props} />;
    }
}

export default Home;