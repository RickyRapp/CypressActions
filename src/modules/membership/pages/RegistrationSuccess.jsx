import React from 'react';
import { inject, observer } from 'mobx-react';
import { RegistrationSuccessTemplate } from 'themes/modules/membership/pages';

@inject((i) => ({
    viewStore: i.rootStore.app.membership.viewStore
}))
@observer
export default class RegistrationSuccess extends React.Component {
    render() {
        return <RegistrationSuccessTemplate {...this.props} />
    }
}