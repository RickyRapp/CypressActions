import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { LookupService } from "common/data";
import { DonorAccountEditViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountEditViewStore(rootStore), 'editViewStore')
@observer
class DonorAccountEdit extends React.Component {
    render() {
        return <DonorAccountEditTemplate {...this.props} />;
    }

    componentDidMount() {
        this.props.editViewStore.handleOptions();
    }
}

export default DonorAccountEdit;