import React from 'react';
import { GrantDetailsTemplate } from 'themes/modules/common/grant/pages';
import { observer } from 'mobx-react';
import { GrantDetailsViewStore } from 'modules/common/grant/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore, props) => new GrantDetailsViewStore(rootStore, { id: props.id }), 'grantDetailsViewStore')
@observer
class GrantDetails extends React.Component {
    render() {
        return <GrantDetailsTemplate {...this.props} />;
    }
}

export default GrantDetails;
