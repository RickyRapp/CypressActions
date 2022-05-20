import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SelectDonorTemplate } from 'themes/application/administration/donor/components';
import { SelectDonorViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore, props) => new SelectDonorViewStore(rootStore, {
    donorId: props.modalParams.data.donorId,
    onClickDonorFromFilter: props.modalParams.data.onClickDonorFromFilter,
    onChange: props.modalParams.data.onChange,
    displayToggle: props.modalParams.data.displayToggle
}), 'selectDonorViewStore')
@observer
class SelectDonor extends React.Component {
    render() {
        return <SelectDonorTemplate {...this.props} />
    }
}

export default SelectDonor;
