import React from 'react';
import { observer } from 'mobx-react';
import { EmailAddressEditTemplate } from 'themes/modules/email-address/pages';

@observer
class EmailAddressEdit extends React.Component {
    render() {
        return <EmailAddressEditTemplate {...this.props} />
    }
}

export default EmailAddressEdit;