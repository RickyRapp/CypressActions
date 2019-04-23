import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { EmailAddressEditTemplate } from 'themes/modules/common/email-address/pages';
import { EmailAddressEditViewStore } from 'modules/common/email-address/stores';

@setCurrentView((rootStore, props) => new EmailAddressEditViewStore(rootStore, { id: props.id, onAfterUpdate: props.onAfterUpdate, item: props.item }), 'emailAddressEditViewStore')
@observer
class EmailAddressEdit extends React.Component {
    render() {
        return <EmailAddressEditTemplate {...this.props} />
    }
}

export default EmailAddressEdit;