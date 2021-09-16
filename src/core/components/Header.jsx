import React from 'react';
import { inject, observer } from 'mobx-react';

import { BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import { HeaderTemplate } from 'themes/components';

@inject((i) => ({
    rootStore: i.rootStore,
    routerStore: i.rootStore.routerStore,
    appStore: i.rootStore.appStore,
    viewStore: i.rootStore.viewStore,
    menuStore: i.rootStore.menuStore,
    // localizationStore: i.rootStore.localizationStore
    headerViewStore: new HeaderViewStore(i.rootStore)
}))
@observer
class Header extends React.Component {
    render() {
        return <HeaderTemplate
            {...this.props} />
    }
}

export default Header;

class HeaderViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.rootStore = rootStore;

        this.applicationSelectorModal = new ModalParams({});
    }
}
