import React from 'react';
import { inject } from 'mobx-react';
import { BankAccountTemplate } from 'themes/components';

@inject(i => ({
    language: i.rootStore.localizationStore.language
}))
class BankAccount extends React.Component {
    render() {
        return <BankAccountTemplate {...this.props} />
    }
}

export default BankAccount;