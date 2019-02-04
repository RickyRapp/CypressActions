import React from 'react';
import { MenuTemplate } from 'themes/components';
import { inject, observer } from 'mobx-react';

@inject(i => ({
  routerStore: i.rootStore.routerStore,
  menuStore: i.rootStore.menuStore
}))
@observer
class BaasicMenu extends React.Component {
  render() {
    return <MenuTemplate {...this.props} />;
  }
}

export default BaasicMenu;
