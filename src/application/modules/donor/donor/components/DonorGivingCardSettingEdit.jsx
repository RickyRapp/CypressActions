import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorGivingCardSettingEditTemplate } from 'themes/application/donor/donor/components';
import { DonorGivingCardSettingEditViewStore } from 'application/donor/donor/stores';

@setCurrentView((rootStore, props) => new DonorGivingCardSettingEditViewStore(rootStore, props.setting), 'donorGivingCardSettingEditViewStore')
@observer
class DonorGivingCardSettingEdit extends React.Component {
    render() {
        return <DonorGivingCardSettingEditTemplate {...this.props} />
    }
}

export default DonorGivingCardSettingEdit;