import React from 'react';
import { inject, observer } from 'mobx-react';
import { PageTemplate } from 'themes/layouts';

function Page(props) {
    return <PageTemplate {...props} />;
}

export default inject(i => ({
    rootStore: i.rootStore
}))(observer(Page));
