import React from 'react';
import { observer } from 'mobx-react';
import { RegisterViewStore } from 'application/membership/stores';
import { setCurrentView } from 'core/utils';
import { RegistrationSuccessTemplate } from 'themes/application/membership/pages';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore), 'viewStore')
@observer
export default class RegistrationSuccess extends React.Component {
    render() {
        return <RegistrationSuccessTemplate {...this.props} />
    }
}