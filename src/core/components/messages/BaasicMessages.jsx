import React, {Component} from 'react';
import {inject} from 'mobx-react';

import {BaasicMessagesTemplate} from 'themes/components';

@inject((i) => ({
    viewStore: i.rootStore.viewStore,
    baasicMessageStore: i.rootStore.baasicMessageStore
}))
class BaasicMessages extends Component {
    render() {
        return <BaasicMessagesTemplate {...this.props} />
    }
}

BaasicMessages.propTypes = {};

export default BaasicMessages;
