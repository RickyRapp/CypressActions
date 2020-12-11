import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWebsiteCreateTemplate } from 'themes/application/administration/charity-website/components';
import { CharityWebsiteCreateViewStore } from 'application/administration/charity-website/stores';

@setCurrentView((rootStore, props) => new CharityWebsiteCreateViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterAction), 'charityWebsiteCreateViewStore')
@observer
class CharityWebsiteCreate extends React.Component {
    render() {
        return <CharityWebsiteCreateTemplate {...this.props} />
    }
}

export default CharityWebsiteCreate;
