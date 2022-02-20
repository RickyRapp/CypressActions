import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityResetPasswordTemplate } from 'themes/application/charity/charity/components';
import { CharityResetPasswordViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityResetPasswordViewStore(rootStore), 'charityResetPasswordViewStore')
@observer
class CharityResetPassword extends React.Component {
    render() {
        return <CharityResetPasswordTemplate {...this.props} />
    }
}

export default CharityResetPassword;