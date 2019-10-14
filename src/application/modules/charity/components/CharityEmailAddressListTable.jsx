import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityEmailAddressListTableTemplate } from 'themes/application/charity/components';
import { CharityEmailAddressViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityEmailAddressViewStore(rootStore), 'charityEmailAddressViewStore')
@observer
class CharityEmailAddressListTable extends React.Component {
    render() {
        return <CharityEmailAddressListTableTemplate {...this.props} />
    }
}

export default CharityEmailAddressListTable;
