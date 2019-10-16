import React from 'react';
import { DonorAccountCreateTemplate } from 'themes/application/donor-account/pages';
import { observer } from 'mobx-react';
import { DonorAccountCreateViewStore } from 'application/donor-account/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new DonorAccountCreateViewStore(rootStore), 'donorAccountCreateViewStore')
@observer
class DonorAccountCreate extends React.Component {
    render() {
        return <DonorAccountCreateTemplate {...this.props} />
    }
}

export default DonorAccountCreate;
