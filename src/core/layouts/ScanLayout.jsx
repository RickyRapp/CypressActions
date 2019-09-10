import React from 'react';
import { inject } from 'mobx-react';
import { ScanLayoutTemplate } from 'themes/layouts';

function ScanLayout(props) {
  return <ScanLayoutTemplate {...props} />;
}

export default inject(i => ({
  initialized: i.rootStore.appStore.initialized,
  viewStore: i.rootStore.viewStore
}))(ScanLayout);
