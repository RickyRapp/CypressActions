import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TestEmailListTemplate } from 'themes/application/administration/test/pages';
import { TestEmailViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new TestEmailViewStore(rootStore), 'testEmailViewStore')
@observer
class TestEmailList extends React.Component {
    render() {
        return <TestEmailListTemplate {...this.props} />
    }
}

export default TestEmailList;
