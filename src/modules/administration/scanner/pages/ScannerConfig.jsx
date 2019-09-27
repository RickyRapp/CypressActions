import React from 'react';
import { observer } from 'mobx-react';
import { ScannerConfigViewStore } from 'modules/administration/scanner/stores';
import { ScannerConfigTemplate } from 'themes/modules/administration/scanner/pages';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ScannerConfigViewStore(rootStore), 'scannerConfigViewStore')
@observer
class ScannerConfig extends React.Component {
  render() {
    return <ScannerConfigTemplate {...this.props} />;
  }
}

export default ScannerConfig;
