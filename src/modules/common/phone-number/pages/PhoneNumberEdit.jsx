import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PhoneNumberEditTemplate } from 'themes/modules/common/phone-number/pages';
import { PhoneNumberEditViewStore } from 'modules/common/phone-number/stores';

@setCurrentView((rootStore, props) => new PhoneNumberEditViewStore(rootStore, { id: props.id, onAfterUpdate: props.onAfterUpdate, item: props.item }), 'phoneNumberEditViewStore')
@observer
class PhoneNumberEdit extends React.Component {
    render() {
        return <PhoneNumberEditTemplate {...this.props} />
    }
}

export default PhoneNumberEdit;