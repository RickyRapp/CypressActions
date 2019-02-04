import React from 'react';
import { HeaderTemplate } from 'themes/components';
import { inject, observer } from 'mobx-react';

@inject(i => ({
  rootStore: i.rootStore,
  routerStore: i.rootStore.routerStore,
  appStore: i.rootStore.appStore
  // localizationStore: i.rootStore.localizationStore
}))
@observer
class Header extends React.Component {
  render() {
    return <HeaderTemplate {...this.props} />;
  }
}

export default Header;
