import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorListTemplate } from 'themes/application/donor/pages';
import { DonorViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorViewStore(rootStore), 'donorViewStore')
@observer
class DonorList extends React.Component {
    render() {
        return <DonorListTemplate {...this.props} />
    }
}

export default DonorList;
