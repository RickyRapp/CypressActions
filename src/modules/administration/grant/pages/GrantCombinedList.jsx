import React from 'react';
import { observer } from 'mobx-react';
import { GrantCombinedListTemplate } from 'themes/modules/administration/grant/pages';
import { setCurrentView } from 'core/utils';
import { GrantCombinedListViewStore } from 'modules/administration/grant/stores';

@setCurrentView(rootStore => new GrantCombinedListViewStore(rootStore), 'grantCombinedListViewStore')
@observer
class GrantCombinedList extends React.Component {
    render() {
        return <GrantCombinedListTemplate {...this.props} />;
    }
}

export default GrantCombinedList;