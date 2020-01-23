import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CheckListTemplate } from 'themes/application/administration/reconcile/pages';
import { CheckViewStore } from 'application/administration/reconcile/stores';

@setCurrentView((rootStore) => new CheckViewStore(rootStore), 'checkViewStore')
@observer
class CheckList extends React.Component {
    render() {
        return <CheckListTemplate {...this.props} />
    }
}

export default CheckList;
