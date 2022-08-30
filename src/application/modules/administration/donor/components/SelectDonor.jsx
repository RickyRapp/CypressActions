import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SelectDonorTemplate } from 'themes/application/administration/donor/components';
import { SelectDonorViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore, props) => new SelectDonorViewStore(rootStore, {
    donorId: props.modalParams.data.donorId,
    charityId: props.modalParams.data.charityId,
    onClickDonorFromFilter: props.modalParams.data.onClickDonorFromFilter,
    onClickCharityFromFilter: props.modalParams.data.onClickCharityFromFilter,
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
