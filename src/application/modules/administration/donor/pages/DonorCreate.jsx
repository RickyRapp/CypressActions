import React from 'react';
import { DonorCreateTemplate } from 'themes/application/administration/donor/pages';
import { observer } from 'mobx-react';
import { DonorCreateViewStore } from 'application/administration/donor/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new DonorCreateViewStore(rootStore), 'donorCreateViewStore')
@observer
class DonorCreate extends React.Component {
    render() {
        return <DonorCreateTemplate {...this.props} />
    }
}

export default DonorCreate;
