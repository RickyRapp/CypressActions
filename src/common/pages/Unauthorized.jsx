import React from 'react';
import { observer, inject } from 'mobx-react';
import { UnauthorizedTemplate } from 'themes/common/pages'

@inject((i) => ({
    rootStore: i.rootStore
}))
@observer
class Unauthorized extends React.Component {
    render() {
        return <UnauthorizedTemplate {...this.props} />
    }
}

export default Unauthorized;