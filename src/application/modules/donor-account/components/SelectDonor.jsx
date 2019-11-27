import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SelectDonorTemplate } from 'themes/application/donor-account/components';
import { SelectDonorViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore, props) => new SelectDonorViewStore(rootStore, {
    donorAccountId: props.modalParams.data.donorAccountId,
    onClickDonorFromFilter: props.modalParams.data.onClickDonorFromFilter,
    onChange: props.modalParams.data.onChange
}), 'selectDonorViewStore')
@observer
class SelectDonor extends React.Component {
    render() {
        return <SelectDonorTemplate {...this.props} />
    }
}

export default SelectDonor;
