import React from 'react';
import { PhoneNumberTemplate } from 'themes/components';

class PhoneNumber extends React.Component {
    render() {
        return <PhoneNumberTemplate {...this.props} />
    }
}

export default PhoneNumber;