import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ThirdPartyWebsiteListTemplate } from 'themes/application/administration/third-party-website/pages';
import { ThirdPartyWebsiteViewStore } from 'application/administration/third-party-website/stores';

@setCurrentView((rootStore) => new ThirdPartyWebsiteViewStore(rootStore), 'thirdPartyWebsiteViewStore')
@observer
class ThirdPartyWebsiteList extends React.Component {
    render() {
        return <ThirdPartyWebsiteListTemplate {...this.props} />
    }
}

export default ThirdPartyWebsiteList;
