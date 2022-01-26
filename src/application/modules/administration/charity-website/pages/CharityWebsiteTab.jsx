import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWebsiteTabTemplate } from 'themes/application/administration/charity-website/pages';
import { CharitiyWebsiteTabViewStore } from 'application/administration/charity-website/stores';

@setCurrentView((rootStore) => new CharitiyWebsiteTabViewStore(rootStore), 'charitiyWebsiteTabViewStore')
@observer
class CharitiyWebsiteTab extends React.Component {
    render() {
        return <CharityWebsiteTabTemplate {...this.props} />
    }
}

export default CharitiyWebsiteTab;
