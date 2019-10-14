import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ChartiyBankAccountListTableTemplate } from 'themes/application/charity/components';
import { ChartiyBankAccountViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new ChartiyBankAccountViewStore(rootStore), 'ChartiyBankAccountViewStore')
@observer
class ChartiyBankAccountListTable extends React.Component {
    render() {
        return <ChartiyBankAccountListTableTemplate {...this.props} />
    }
}

export default ChartiyBankAccountListTable;
