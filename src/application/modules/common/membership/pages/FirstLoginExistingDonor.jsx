import React from 'react';
import { observer } from 'mobx-react';
import { FirstLoginExistingDonorTemplate } from 'themes/application/membership/pages';
import { setCurrentView } from 'core/utils';
import { FirstLoginExistingDonorViewStore } from 'application/common/membership/stores';

@setCurrentView((rootStore) => new FirstLoginExistingDonorViewStore(rootStore))
@observer
export default class FirstLoginExistingDonor extends React.Component {
    render() {
        return <FirstLoginExistingDonorTemplate {...this.props} />
    }
}
