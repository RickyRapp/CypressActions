import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityChangePasswordTemplate } from 'themes/application/charity/charity/components';
import { CharityChangePasswordViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityChangePasswordViewStore(rootStore), 'charityChangePasswordViewStore')
@observer
class CharityChangePassword extends React.Component {
    render() {
        return <CharityChangePasswordTemplate {...this.props} />
    }
}

export default CharityChangePassword;