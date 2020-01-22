import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ThirdPartyWebsiteCreateTemplate } from 'themes/application/third-party-website/components';
import { ThirdPartyWebsiteCreateViewStore } from 'application/third-party-website/stores';

@setCurrentView((rootStore, props) => new ThirdPartyWebsiteCreateViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterAction), 'thirdPartyWebsiteCreateViewStore')
@observer
class ThirdPartyWebsiteCreate extends React.Component {
    render() {
        return <ThirdPartyWebsiteCreateTemplate {...this.props} />
    }
}

export default ThirdPartyWebsiteCreate;
