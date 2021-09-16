import React from 'react';
import { inject } from 'mobx-react';
import { AddressTemplate } from 'themes/components';

@inject(i => ({
    language: i.rootStore.localizationStore.language
}))
class Address extends React.Component {
    render() {
        return <AddressTemplate {...this.props} />
    }
}

export default Address;