import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantListTemplate } from 'themes/application/grant/pages';
import { GrantViewStore } from 'application/grant/stores';

@setCurrentView((rootStore, props) => new GrantViewStore(rootStore, { onChangeDonorFilter: props.onChangeDonorFilter }), 'grantViewStore')
@observer
class GrantList extends React.Component {
    render() {
        return <GrantListTemplate {...this.props} />
    }
}

export default GrantList;
