import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { HomeTemplate } from 'themes/application/public/pages';
import { HomeViewStore } from 'application/public/stores';

@setCurrentView((rootStore) => new HomeViewStore(rootStore), 'homeViewStore')
@observer
class Home extends React.Component {
    render() {
        return <HomeTemplate {...this.props} />
    }
}

export default Home;
