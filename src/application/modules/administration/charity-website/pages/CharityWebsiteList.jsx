import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWebsiteListTemplate } from 'themes/application/administration/charity-website/pages';
import { CharityWebsiteViewStore } from 'application/administration/charity-website/stores';

@setCurrentView((rootStore, props) => new CharityWebsiteViewStore(rootStore, props.websiteType), 'charityWebsiteViewStore')
@observer
class CharityWebsiteList extends React.Component {
    render() {
        return <CharityWebsiteListTemplate {...this.props} />
    }
}

export default CharityWebsiteList;
