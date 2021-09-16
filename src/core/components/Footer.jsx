import React from 'react';
import { FooterTemplate } from 'themes/components';
import { inject, observer } from 'mobx-react';

@inject(i => ({
    routerStore: i.rootStore.routerStore,
    menuStore: i.rootStore.menuStore
}))
@observer
class Footer extends React.Component {
    render() {
        return <FooterTemplate {...this.props} />
    }
}

export default Footer;