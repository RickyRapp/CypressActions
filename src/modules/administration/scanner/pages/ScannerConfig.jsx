import React from 'react';
import { observer } from 'mobx-react';
import { ScannerConfigViewStore } from 'modules/administration/scanner/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ScannerConfigViewStore(rootStore), 'scannerConfigViewStore')
@observer
class ScannerConfig extends React.Component {
  render() {
    return <div>Configure Scan Page</div>
  }
}

export default ScannerConfig;
