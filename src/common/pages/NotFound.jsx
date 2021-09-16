import React from 'react';
import { observer, inject } from 'mobx-react';
import { NotFoundTemplate } from 'themes/common/pages';

@inject((i) => ({
    rootStore: i.rootStore
}))
@observer
class NotFound extends React.Component {
    render() {
        return <NotFoundTemplate {...this.props} />
    }
}

export default NotFound;