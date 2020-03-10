import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TestTabTemplate } from 'themes/application/administration/test/pages';
import { TestTabViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new TestTabViewStore(rootStore), 'testTabViewStore')
@observer
class TestTab extends React.Component {
    render() {
        return <TestTabTemplate {...this.props} />
    }
}

export default TestTab;
