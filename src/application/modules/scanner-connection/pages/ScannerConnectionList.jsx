import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScannerConnectionListTemplate } from 'themes/application/scanner-connection/pages';
import { ScannerConnectionViewStore } from 'application/scanner-connection/stores';

@setCurrentView((rootStore) => new ScannerConnectionViewStore(rootStore), 'scannerConnectionViewStore')
@observer
class ScannerConnectionList extends React.Component {
    render() {
        return <ScannerConnectionListTemplate {...this.props} />
    }
}

export default ScannerConnectionList;
