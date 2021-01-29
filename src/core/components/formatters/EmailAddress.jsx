import React from 'react';
import { inject } from 'mobx-react';
import { EmailAddressTemplate } from 'themes/components';

@inject(i => ({
    language: i.rootStore.localizationStore.language
}))
class EmailAddress extends React.Component {
    render() {
        return <EmailAddressTemplate {...this.props} />
    }
}

export default EmailAddress;