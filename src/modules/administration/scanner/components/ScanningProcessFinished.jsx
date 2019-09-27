import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ScanningProcessFinishedViewStore } from 'modules/administration/scanner/stores';

@setCurrentView((rootStore, props) => new ScanningProcessFinishedViewStore(rootStore, props.nextStep), 'scanningProcessFinishedViewStore')
@observer
class ScanningProcessFinished extends React.Component {
    render() {
        const {
            currentCount,
        } = this.props.scanningProcessFinishedViewStore;

        return (
            <div>
                <div>
                    End In {currentCount}
                </div>
            </div>
        )
    }
}

export default ScanningProcessFinished;

