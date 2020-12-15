import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantGivingCardCreateTemplate } from 'themes/application/charity/grant/pages';
import { GrantGivingCardCreateViewStore } from 'application/charity/grant/stores';

@setCurrentView((rootStore) => new GrantGivingCardCreateViewStore(rootStore), 'grantGivingCardCreateViewStore')
@observer
class GrantGivingCardCreate extends React.Component {
    render() {
        return <GrantGivingCardCreateTemplate {...this.props} />
    }
}

export default GrantGivingCardCreate;
