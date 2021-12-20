import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AnnualReceiptTemplate } from 'themes/application/administration/test/pages';
import { AnnualReceiptViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new AnnualReceiptViewStore(rootStore), 'annualReceiptViewStore')
@observer
class AnnualReceipt extends React.Component {
    render() {
        return <AnnualReceiptTemplate {...this.props} />
    }
}

export default AnnualReceipt;
