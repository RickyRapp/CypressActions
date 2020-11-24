import React from 'react';
import { inject, observer } from 'mobx-react';
import { PageHeaderTemplate } from 'themes/layouts';

@inject((i) => ({
    rootStore: i.rootStore,
    menuStore: i.rootStore.menuStore,
}))
@observer
class PageHeader extends React.Component {
    render() {
        return <PageHeaderTemplate
            {...this.props} />
    }
}

export default PageHeader;
