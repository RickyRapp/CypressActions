import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SelectCharityTemplate } from 'themes/application/administration/charity/components';
import { SelectCharityViewStore } from '../stores';

@setCurrentView((rootStore, props) => new SelectCharityViewStore(rootStore, {
    charityId: props.modalParams.data.donorId,
    onClickCharityFromFilter: props.modalParams.data.onClickCharityFromFilter,
    onChange: props.modalParams.data.onChange,
    displayToggle: props.modalParams.data.displayToggle
}), 'selectCharityViewStore')
@observer
class SelectCharity extends React.Component {
    render() {
        return <SelectCharityTemplate {...this.props} />
    }
}

export default SelectCharity;
