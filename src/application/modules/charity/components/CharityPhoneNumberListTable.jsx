import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityPhoneNumberListTableTemplate } from 'themes/application/charity/components';
import { CharityPhoneNumberViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityPhoneNumberViewStore(rootStore), 'charityPhoneNumberViewStore')
@observer
class CharityPhoneNumberListTable extends React.Component {
    render() {
        return <CharityPhoneNumberListTableTemplate {...this.props} />
    }
}

export default CharityPhoneNumberListTable;
