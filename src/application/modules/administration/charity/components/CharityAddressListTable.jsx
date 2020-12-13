import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityAddressListTableTemplate } from 'themes/application/administration/charity/components';
import { CharityAddressViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityAddressViewStore(rootStore), 'charityAddressViewStore')
@observer
class CharityAddressListTable extends React.Component {
    render() {
        return <CharityAddressListTableTemplate {...this.props} />
    }
}

export default CharityAddressListTable;
