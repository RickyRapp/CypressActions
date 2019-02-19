import React from 'react';
import { observer } from 'mobx-react';
import { PhoneNumberEditTemplate } from 'themes/modules/phone-number/pages';

@observer
class PhoneNumberEdit extends React.Component {
    render() {
        return <PhoneNumberEditTemplate {...this.props} />
    }
}

export default PhoneNumberEdit;