import React from 'react';
import { observer } from 'mobx-react';
import { GrantEditTemplate } from 'themes/modules/administration/grant/pages';
import { setCurrentView } from 'core/utils';
import { GrantEditViewStore } from 'modules/administration/grant/stores';

@setCurrentView(rootStore => new GrantEditViewStore(rootStore), 'grantEditViewStore')
@observer
class GrantEdit extends React.Component {
    render() {
        return <GrantEditTemplate {...this.props} />;
    }
}

export default GrantEdit;