import React from 'react';
import { GrantRegularDetailsTemplate } from 'themes/modules/common/grant/pages';
import { observer } from 'mobx-react';
import { GrantRegularDetailsViewStore } from 'modules/common/grant/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore, props) => new GrantRegularDetailsViewStore(rootStore, { id: props.id, highlightId: props.highlightId }), 'grantDetailsViewStore')
@observer
class GrantRegularDetails extends React.Component {
    render() {
        return <GrantRegularDetailsTemplate {...this.props} />;
    }
}

export default GrantRegularDetails;
