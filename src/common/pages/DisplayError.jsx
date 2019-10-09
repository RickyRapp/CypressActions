import React from 'react';
import { DisplayErrorTemplate } from 'themes/common/pages';
import { observer, inject } from 'mobx-react';

@inject((i) => ({
    errorStore: i.rootStore.errorStore,
    applicationStore: i.rootStore.applicationStore
}))
@observer
class DisplayError extends React.Component {
    render() {
        return <DisplayErrorTemplate {...this.props} />
    }
}

export default DisplayError;
