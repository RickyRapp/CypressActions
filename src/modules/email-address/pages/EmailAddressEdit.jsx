import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { EmailAddressEditTemplate } from 'themes/modules/email-address/pages';
import { EmailAddressEditViewStore } from 'modules/email-address/stores';

@setCurrentView((rootStore, props) => new EmailAddressEditViewStore(rootStore, { id: props.id, onAfterCreate: props.onAfterCreate }), 'emailAddressEditViewStore')
@observer
class EmailAddressEdit extends React.Component {
    render() {
        return <EmailAddressEditTemplate {...this.props} />
    }
}

export default EmailAddressEdit;